import { useContext, useEffect } from "react"
import { Style, Title } from "./style"
import axios, { AxiosResponse } from "axios"
import Grid from "../../components/Grid"
import Loader from "../../components/Loader"
import { GridContext } from "../../contexts/GridContext"

function Home() {

	const { grid, setGrid, flipGrid } = useContext(GridContext)

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
			<Title onClick={flipGrid}>r/Place</Title>
			{
				grid ?
				<Grid />
				:
				<Loader />
			}			
		</Style>
	)
}

export default Home