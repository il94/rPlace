import styled from "styled-components";
import colors from "../../../utils/colors";

export const Style = styled.div<{ $flip: boolean, $display: boolean }>`
	display: ${({ $display }) => $display ? "none" : "flex" };
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;

	position: relative;

	backface-visibility: hidden;

	background-color: ${colors.window};

`

export const GridTilte = styled.p`

	position: absolute;
	top: 0px;
	left: 50%;
	transform: translateX(-50%);

	width: 100%;

	cursor: default;

	font-size: 48px;
	text-align: center;
	
	color: ${colors.text.alt};
`

export const Button = styled.button`

	width: 200px;
	height: 75px;

	border-radius: 15px;

	font-size: 26px;

	background-color: ${colors.button.form.default};

	transition: transform 0.35s ease;
	&:hover {
		background-color: ${colors.button.form.hover};
		transform: scale(1.05);
	}
`