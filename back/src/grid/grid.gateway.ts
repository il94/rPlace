import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
	cors: {
		origin: process.env.URL_FRONT
	}
})

export class GridGateway {
    @WebSocketServer()
    server: Server
}
