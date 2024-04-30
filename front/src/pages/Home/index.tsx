import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Style, Title } from "./style"
import { GridType } from "../../utils/types"
import axios, { AxiosResponse } from "axios"
import Grid from "../../components/Grid"

function Home() {
	const [grid, setGrid] = useState<GridType | undefined>()

	useEffect(() => {
		async function fetchGrid() {
			try {
				const gridResponse: AxiosResponse = await axios.get(`${import.meta.env.VITE_URL_BACK}/grid`)

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
			<Title>r/Place</Title>
			{
				grid &&
				<Grid grid={grid} setGrid={setGrid as Dispatch<SetStateAction<GridType>>} />
			}			
		</Style>
	)
}

export default Home