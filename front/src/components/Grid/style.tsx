import styled from "styled-components";
import colors from "../../utils/colors";

export const Style = styled.div<{ $flip: boolean }>`
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

	transform: ${({ $flip }) => $flip && "rotateY(180deg)" };
	transition: transform 1s linear;
	transform-style: preserve-3d;
`

export const Recto = styled.div<{ $flip: boolean, $display: boolean }>`
	display: ${({ $display }) => $display ? "none" : "block" };

	width: 100%;
	height: 100%;

	backface-visibility: hidden;
`

export const Verso = styled.div<{ $flip: boolean, $display: boolean }>`
	display: ${({ $display }) => $display ? "flex" : "none" };
	flex-direction: column;
	align-content: center;

	width: 100%;
	height: 100%;

	background-color: #272727;
	
	transform: ${({ $flip }) => $flip && "rotateY(180deg)" };
`