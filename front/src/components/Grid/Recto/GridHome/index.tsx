import axios from "axios";
import { GridTilte, Button } from "../style";
import styled from "styled-components";
import colors from "../../../../utils/colors";
import { ActiveText } from "../GridConnect/style";
import { Dispatch, SetStateAction, useContext } from "react";
import { Pages } from "../../../../utils/enums";
import { GridContext } from "../../../../contexts/GridContext";

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
		await axios.delete(`${import.meta.env.VITE_URL_BACK}/auth/logout`, {
			withCredentials: true
		})

		setPageToDisplay(Pages.SIGNIN)
	}

	return (
		<>
			<GridTilte>Welcome, Master.</GridTilte>
			<CentralDiv>
				<Button onClick={() => flipGrid()}>Start !</Button>
				<ActiveText onClick={() => logout()}>Logout</ActiveText>
			</CentralDiv>
		</>
	)
}

export default GridHome