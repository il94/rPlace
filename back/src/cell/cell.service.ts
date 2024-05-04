import { ForbiddenException, Injectable } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { CellRepository } from './cell.repository';
import { Prisma, Role, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CellService {
	constructor(
		private appGateway: AppGateway,
		private repository: CellRepository,
		private userService: UserService
	) {}

	async createCell(gridId: number) {
		await this.repository.createCell(gridId)
	}

	async getAllCells(gridId: number) {
		const cells = this.repository.getAllCells(gridId)

		return (cells)
	}

	async getHistory(cellId: number) {
		try {
			const history = await this.repository.getCellHistory(cellId)
			
			history.reverse()
			return (history)
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	async setNewColorAll(userId: number, newColor: string) {
		try {
			const isAdmin = await this.userService.isAdmin(userId)
			if (await this.verifyConditions(userId, 10000, isAdmin))
			{
				if (!isAdmin)
					await this.userService.removePoints(userId, 10000)
				await this.drawScreen(userId, newColor)
				await this.userService.setLastInputDate(userId)
				
				this.appGateway.server.emit("screenUsed", newColor)
			}
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	async setNewColor(userId: number, cellId: number, newColor: string) {
		try {
			const isAdmin = await this.userService.isAdmin(userId)
			if (await this.verifyConditions(userId, 0, isAdmin))
			{
				await this.drawPixel(userId, cellId, newColor)
				await this.userService.setLastInputDate(userId)
				await this.userService.addPoints(userId, 1)
				
				this.appGateway.server.emit("pixelDrawed", cellId, newColor)
			}
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	async setNewColorZone(userId: number, cellId: number, newColor: string) {
		try {
			const isAdmin = await this.userService.isAdmin(userId)
			if (await this.verifyConditions(userId, 15, isAdmin))
			{
				if (!isAdmin)
					await this.userService.removePoints(userId, 15)
				await this.drawBomb(userId, cellId, newColor)
				await this.userService.setLastInputDate(userId)
				
				this.appGateway.server.emit("bombUsed", cellId, newColor)
			}
		}
		catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				throw new ForbiddenException("The provided credentials are not allowed")
			else
				throw error
		}
	}

	/* ==================== UTILS ================== */

	async drawPixel(userId: number, cellId: number, newColor: string) {
		const username = await this.userService.getUsername(userId)
		const role = await this.userService.getRole(userId)
	
		await this.putPixel(cellId, username, newColor, role)
	}

	async drawBomb(userId: number, cellId: number, newColor: string) {
		const username = await this.userService.getUsername(userId)
		const role = await this.userService.getRole(userId)
	
		const results: number[] = this.determineCircle(cellId, 11)
		for (const id of results) {
			await this.putPixel(id, username, newColor, role)
		}
	}

	async drawScreen(userId: number, newColor: string) {
		const username = await this.userService.getUsername(userId)
		const role = await this.userService.getRole(userId)
		
		for (let i = 1; i <= 1600; i++) {
			await this.putPixel(i, username, newColor, role)
		}
	}

	async putPixel(cellId: number, username: string, newColor: string, role: Role) {
		await this.repository.createCellHistoryEntry(username, cellId, newColor, role)
		const count = await this.repository.getCellHistoryCount(cellId)
		if (count > 5)
			await this.repository.deleteCellHistoryLatestEntry(cellId)
	}


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

	async verifyConditions(userId: number, price: number, isAdmin: boolean): Promise<boolean> {
		const userDatas: Partial<User> = await this.userService.getUser(userId)

		if (isAdmin || (this.verifyCooldown(userDatas.lastPut) && this.verifyWallet(userDatas.wallet, price)))
			return true
		return false
	}
	
	verifyCooldown(lastPut: Date): boolean {
		const currentDate = new Date()
		const difference = Math.abs(lastPut.getTime() / 1000 - currentDate.getTime() / 1000);
		
		return (difference >= 5)
	}
	
	verifyWallet(wallet: number, price: number): boolean {
		return (wallet >= price)
	}
}
