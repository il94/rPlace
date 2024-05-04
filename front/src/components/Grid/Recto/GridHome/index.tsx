import { GridTilte, Button } from "../style";
import styled from "styled-components";
import colors from "../../../../utils/colors";
import { ActiveText } from "../GridConnect/style";
import { useContext, useEffect, useState } from "react";
import { Page } from "../../../../utils/enums";
import { GridContext } from "../../../../contexts/GridContext";
import Cookies from "js-cookie";

const CentralDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	height: 100px;

	color: ${colors.text.alt};
`

function GridHome() {

	const { flipGrid, setPageToDisplay } = useContext(GridContext)
	
	async function logout() {
		try {
			// await axios.delete(`${import.meta.env.VITE_URL_BACK}/auth/logout`, {
			// 	headers: {
			// 		'Authorization': `Bearer ${Cookies.get("access_token")}`
			// 	}
			// })
			Cookies.remove("access_token")
			setPageToDisplay(Page.SIGNIN)
		}
		catch (error) {

		}
	}

	const surnames = ["Master", "Guru", "BG", "Your Grace", "Boss", "Le Sang"]
	const [surname, setSurname] = useState('')

	useEffect(() => {
		setSurname(surnames[Math.floor(Math.random() * surnames.length)])
	}, [])

	return (
		<>
			<GridTilte>Welcome, {surname}.</GridTilte>
			<CentralDiv>
				<Button onClick={() => flipGrid()}>Start !</Button>
				<ActiveText onClick={() => logout()}>Logout</ActiveText>
			</CentralDiv>
		</>
	)
}

export default GridHome