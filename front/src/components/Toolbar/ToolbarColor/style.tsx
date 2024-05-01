import styled from "styled-components";
import colors from "../../../utils/colors";

export const Style = styled.div<{ $backgroundColor: string, $selected: boolean }>`
	width: 8px;
	height: 8px;

	margin-left: 0.5px;
	margin-right: 0.5px;

	border-radius: 3px;

	border: ${({ $selected }) => $selected ? `solid 2px ${colors.borders.cell}` : `solid 1px ${colors.borders.cell}` };

	cursor: pointer;

	background-color: ${({ $backgroundColor }) => $backgroundColor };

	transition: transform 0.1s linear;
	transform: ${({ $selected }) => $selected && "scale(1.05)" };

	&:hover {
		transform: scale(1.1);
	}
`