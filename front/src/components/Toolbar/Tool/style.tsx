import styled from "styled-components";
import colors from "../../../utils/colors";

export const Style = styled.div`
	margin-left: 8px;

	display: flex;
	justify-content: start;
	/* width: 100%;
	height: 100%; */

`

export const Button = styled.button<{ $selected: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 18px;
	height: 18px;

	cursor: pointer;

	border-radius: 2px;

	box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);

	background-color: ${({ $selected }) => $selected ? colors.button.selected : colors.button.default};

	transition: transform 0.1s linear;

	&:hover {
		transform: scale(1.1);
	}

	& > img {
		width: 90%;
		height: 90%;
	}
`

export const Price = styled.p`
	margin-left: 8px;

	width: 18px;
	height: 18px;

`
