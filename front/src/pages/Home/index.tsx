import { useEffect, useState } from "react"
import { Style } from "./style"
import { GridType } from "../../utils/types"
import axios, { AxiosResponse } from "axios"
import Grid from "../../components/Grid"

function Home() {
	const [grid, setGrid] = useState<GridType | undefined>()
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
	}, [])

	return (
		<Style>
			<h1>r/Place</h1>
			<Grid grid={grid} />
		</Style>
	)
}

export default Home