import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "../utils/types";

const socket: Socket = io(import.meta.env.VITE_URL_BACK, {
	transports: ["websocket"]
})

export const AuthContext = createContext<{
	socket: Socket,
	userDatas: User,
	setUserDatas: Dispatch<SetStateAction<User>>
}>({
	userDatas: {username: '', wallet: 0, lastPut: null, cooldown: false},
	setUserDatas: () => {},
	socket: socket
})

function AuthProvider({ children }: { children: ReactNode }) {

	const [userDatas, setUserDatas] = useState<User>({
		username: '', wallet: 0, lastPut: null, cooldown: false
	})

	useEffect(() => {
		if (userDatas.cooldown) {
			setTimeout(() => {
				setUserDatas((prevState) => ({
					...prevState,
					cooldown: false
				}))
			}, 2000)
		}
	}, [userDatas.cooldown])

	return (
		<AuthContext.Provider value={{socket, userDatas, setUserDatas}}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthProvider