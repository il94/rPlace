import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor (private userService: UserService) {}

	async onApplicationBootstrap() {
		
		const rootExist = await this.userService.rootExist()
		if (!rootExist)
		{
			try {
				await this.userService.createRoot()
			}
			catch (error) {
				console.error(error)
			}
		}
	}

	getHello(): string {
		return "hehe"
	}
}

