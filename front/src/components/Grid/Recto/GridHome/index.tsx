import axios from "axios";
import { GridTilte, Button } from "../style";
import styled from "styled-components";
import colors from "../../../../utils/colors";
import { ActiveText } from "../GridConnect/style";
import { Dispatch, SetStateAction } from "react";
import { Pages } from "../../../../utils/enums";

const CentralDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	height: 100px;

	color: ${colors.text.alt};
`

type PropsLogout = {
	flipGrid: () => void,
	setPageToDisplay: Dispatch<SetStateAction<Pages>>
}

function GridHome({ flipGrid, setPageToDisplay }: PropsLogout) {

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