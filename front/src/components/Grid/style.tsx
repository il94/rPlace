import styled from "styled-components";
import colors from "../../utils/colors";

export const Style = styled.div`
	display: flex;
	flex-wrap: wrap;

	/* @media screen and (max-width: 480px) {
		width: 320px;		
	}
	@media screen and (max-width: 640px) {
		width: 480px;		
	} */
	/* @media screen and (min-width: 640px) { */
		width: 560px;		
	/* } */

	aspect-ratio: 1;
	/* height: 640px; */
	border: solid 16px ${colors.borders.grid};
	border-radius: 4px;
	box-shadow: 0px 4px 15px black;

	background-color: white;
`