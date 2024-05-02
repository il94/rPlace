import styled from "styled-components";
import colors from "../../utils/colors";

export const Style = styled.div<{ $flip: boolean }>`
	display: flex;
	flex-wrap: wrap;

	width: 560px;
	aspect-ratio: 1;
	
	border: solid 16px ${colors.borders.grid};
	border-radius: 4px;
	box-shadow: 0px 4px 15px black;

	background-color: white;

	transform: ${({ $flip }) => $flip && "rotateY(180deg)" };
	transition: transform 1s linear;
	transform-style: preserve-3d;
`

export const Verso = styled.div<{ $flip: boolean, $display: boolean }>`
	display: ${({ $display }) => $display ? "block" : "none" };

	width: 100%;
	height: 100%;

	transform: ${({ $display }) => $display && "rotateY(180deg)" };
`
