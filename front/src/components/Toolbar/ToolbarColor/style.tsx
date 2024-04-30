import styled from "styled-components";
import colors from "../../../utils/colors";

export const Style = styled.div<{ $backgroundColor: string }>`
	width: 8px;
	height: 8px;

	margin-left: 0.5px;
	margin-right: 0.5px;

	border: solid 1.5px ${colors.borders.cell};
	border-radius: 3px;

	cursor: pointer;

	background-color: ${({ $backgroundColor }) => $backgroundColor };

	transition: transform 0.1s linear;

	&:hover {
		transform: scale(1.1);
	}
`