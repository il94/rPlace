import { useContext, useEffect, useState } from "react"
import { Style, Title } from "./style"
import { GridType } from "../../utils/types"
import axios, { AxiosResponse } from "axios"
import Grid from "../../components/Grid"
import { SocketContext } from "../../contexts/socket"

function Home() {
	const [grid, setGrid] = useState<GridType | undefined>()
	const { socket } = useContext(SocketContext)

	useEffect(() => {
	
		async function fetchGrid() {
			try {
				const gridResponse: AxiosResponse<GridType> = await axios.get(`${import.meta.env.VITE_URL_BACK}/grid`)
				setGrid(gridResponse.data)
			}
			catch (error) {
				console.log(error)
			}
		}

		fetchGrid()
		
		socket.on("newColor", (cellId, newColor) => {
			console.log("cellId, newColor", cellId, newColor)
		})
	}, [])

	return (
		<Style>
			<Title>r/Place</Title>
			<Grid grid={grid} />
		</Style>
	)
}

export default Home