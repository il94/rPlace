import { createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(import.meta.env.VITE_URL_BACK, {
	transports: ["websocket"]
})

export const SocketContext = createContext<{ socket: Socket }>({
	socket: socket
})

function SocketProvider({ children }: { children: ReactNode }) {
	return (
		<SocketContext.Provider value={{socket}}>
			{children}
		</SocketContext.Provider>
	)
}

export default SocketProvider