import styled from "styled-components";
import colors from "../../../utils/colors";

export const Style = styled.div`
	display: flex;
	justify-content: start;
	
	margin-left: 8px;

	width: 64px;
`

export const Button = styled.button<{ $available: boolean, $selected: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 18px;
	height: 18px;

	cursor: ${({ $available }) => $available ? "pointer" : "default" };

	border-radius: 2px;

	opacity: ${({ $available }) => !$available && 0.5};
	box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);

	background-color: ${({ $available, $selected }) => $available ? $selected ? colors.button.selected : colors.button.default : colors.button.blocked };
	
	transition: transform 0.1s linear;
	transform:  ${({ $selected }) => $selected && `scale(1.05)` }; 

	&:hover {
		transform: ${({ $available }) => $available && "scale(1.1)" }; ;
	}

	& > img {
		width: 90%;
		height: 90%;
	}
`

export const Price = styled.p`
	margin-left: 8px;

	height: 18px;
`