import { Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { CellRepository } from './cell.repository';
import { History, Role, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { config } from 'src/config/config';

@Injectable()
export class CellService {
	constructor(
		private appGateway: AppGateway,
		private repository: CellRepository,
		private userService: UserService
	) {}

	// Cree une cellule
	async createCell(gridId: number) {
		await this.repository.createCell(gridId)
	}

	// Retourne toute les cellules
	async getAllCells(gridId: number): Promise<CellOnGrid[]> {
		const cells = this.repository.getAllCells(gridId)

		return (cells)
	}

	// Retourne l'historique d'une cellule
	async getHistory(cellId: number): Promise<Partial<History>[]> {
		const history = await this.repository.getCellHistory(cellId)
		
		history.reverse()
		return (history)
	}

	// Change la couleur de tout les pixels
	async setNewColorAll(userId: number, newColor: string) {
		const isAdmin = await this.userService.isAdmin(userId)
		if (await this.verifyConditions(userId, config.screenPrice, isAdmin))
		{
			if (!isAdmin)
				await this.userService.removePoints(userId, config.screenPrice)
			await this.drawScreen(userId, newColor)
			await this.userService.setLastInputDate(userId)
			
			this.appGateway.server.emit("screenUsed", newColor)
		}
	}

	// Change la couleur d'un pixel
	async setNewColor(userId: number, cellId: number, newColor: string) {
		const isAdmin = await this.userService.isAdmin(userId)
		if (await this.verifyConditions(userId, config.penPrice, isAdmin))
		{
			await this.drawPixel(userId, cellId, newColor)
			await this.userService.setLastInputDate(userId)
			await this.userService.addPoints(userId, config.penGive)
			
			this.appGateway.server.emit("pixelDrawed", cellId, newColor)
		}
	}

	// Change la couleur des pixels en zone
	async setNewColorZone(userId: number, cellId: number, newColor: string) {
		const isAdmin = await this.userService.isAdmin(userId)
		if (await this.verifyConditions(userId, config.bombPrice, isAdmin))
		{
			if (!isAdmin)
				await this.userService.removePoints(userId, config.bombPrice)
			await this.drawBomb(userId, cellId, newColor)
			await this.userService.setLastInputDate(userId)
			
			this.appGateway.server.emit("bombUsed", cellId, newColor)
		}
	}

	/* ==================== UTILS ================== */

	// Colore un pixel
	async drawPixel(userId: number, cellId: number, newColor: string) {
		const username = await this.userService.getUsername(userId)
		const role = await this.userService.getRole(userId)
	
		await this.putPixel(cellId, username, newColor, role)
	}

	// Colore une zone
	async drawBomb(userId: number, cellId: number, newColor: string) {
		const username = await this.userService.getUsername(userId)
		const role = await this.userService.getRole(userId)
	
		const results: number[] = this.determineCircle(cellId, config.bombZone)
		for (const id of results) {
			await this.putPixel(id, username, newColor, role)
		}
	}

	// Colore la grille
	async drawScreen(userId: number, newColor: string) {
		const username = await this.userService.getUsername(userId)
		const role = await this.userService.getRole(userId)
		
		for (let i = 1; i <= 1600; i++) {
			await this.putPixel(i, username, newColor, role)
		}
	}

	// Pose un pixel sur la grille
	async putPixel(cellId: number, username: string, newColor: string, role: Role) {
		await this.repository.createCellHistoryEntry(username, cellId, newColor, role)
		const count = await this.repository.getCellHistoryCount(cellId)
		if (count > 5)
			await this.repository.deleteCellHistoryLatestEntry(cellId)
	}

	// Definit la zone a colorer
	determineCircle(start: number, size: number): number[] {
		function getIndexLine(position: number) {
			return (Math.floor(position / 40))
		}
		function getIndexColumn(position: number) {
			if (position % 40 === 0)
				return 40
			return (Math.floor(position % 40))
		}

		function distance(x1: number, y1: number, x2: number, y2: number) {
			return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
		}

		const centerX = getIndexColumn(start)
		const centerY = getIndexLine(start)

		const results = []

		for (let i = 0; i < size; i++) {
			for (let j = 0; j < size; j++) {
				const y = centerY - Math.floor(size / 2) + i
				const x = centerX - Math.floor(size / 2) + j
				if ((y <= 40 && y >= 0) && (x <= 40 && x >= 1) &&
					(distance(centerX, centerY, x, y) <= size / 2)
						&& !(y === 40 && x === 40))
				{
					const result = y * 40 + x
					results.push(result)
				}
			}
		}

		return (results)
	}

	// Verifie si les conditions sont remplies pour dessiner un pixel
	async verifyConditions(userId: number, price: number, isAdmin: boolean): Promise<boolean> {
		const userDatas: Partial<User> = await this.userService.getUser(userId)

		if (userDatas.role === Role.BAN)
			return false

		const currentEntry = new Date()

		if (!(await this.verifyBot(userDatas.username, userDatas.lastPut, currentEntry, isAdmin)))
		{
			await this.userService.setRole(1, userDatas.id, Role.BAN)
			return false
		}
		if (isAdmin || (this.verifyCooldown(userDatas.lastPut, currentEntry) && this.verifyWallet(userDatas.wallet, price)))
			return true
		return false
	}
	
	// Verifie si l'entree est effectuee 3 secondes minimum apres la precedente
	verifyCooldown(lastEntry: Date, currentEntry: Date): boolean {
		const difference = Math.abs(lastEntry.getTime() / 1000 - currentEntry.getTime() / 1000);
		
		return (difference >= 3)
	}

	// Verifie si le user a assez de points
	verifyWallet(wallet: number, price: number): boolean {
		return (wallet >= price)
	}

	// Calcule la difference entre les 3 dernieres entrees pour detecter l'utilisation de scripts
	async verifyBot(username: string, lastEntry: Date, currentEntry: Date, isAdmin: boolean): Promise<boolean> {
		if (isAdmin)
			return true
		
		const lastEntries = await this.userService.getLastEntries(username, 2)
		if (!lastEntries)
			return true
		const secondLastEntry = lastEntries[1]

		const currentEntryDate = currentEntry.getTime() / 1000
		const lastEntryDate = lastEntry.getTime() / 1000
		const secondLastEntryDate = secondLastEntry.createdAt.getTime() / 1000
		
		const difference1 = Math.abs(currentEntryDate - lastEntryDate)
		const difference2 = Math.abs(lastEntryDate - secondLastEntryDate)

		const result = Math.abs(difference1 - difference2)

		return (result > 0.01)
	}
}
