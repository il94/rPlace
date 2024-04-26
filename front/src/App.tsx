import { useEffect, useState } from "react"
import "./App.css"
import Grid from "./components/Grid"
import axios, { AxiosResponse } from "axios"
import { GridType } from "./utils/types"

function App() {

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
		<Grid grid={grid} />
	)
}

export default App
