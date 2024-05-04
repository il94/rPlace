import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserId } from 'src/app.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor (private service: UserService) {}

	@Patch(':id/role')
	async setAdmin(@UserId() authId: number,
	@Param('id', ParseIntPipe) targetId: number,
	@Body('newRole') newRole: Role) {
		await this.service.setRole(authId, targetId, newRole)
	}

}
