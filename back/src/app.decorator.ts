import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const UserId = createParamDecorator((data: unknown, context: ExecutionContext) => {
	const access_token = context.switchToHttp().getRequest().headers['authorization'].split(' ')[1]
	const { userId } = jwt.decode(access_token) as any

	return (userId)
})