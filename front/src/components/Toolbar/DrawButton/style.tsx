import styled from "styled-components";
import colors from "../../../utils/colors";

export const Style = styled.button<{ $available: boolean }>`
	width: 50px;
	height: 50px;

	border-radius: 15px;

	cursor: ${({ $available }) => $available ? "pointer" : "default" };

	box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);
	opacity: ${({ $available }) => !$available && 0.5};

	background-color: ${({ $available }) => $available ? "#48c500" : colors.button.blocked };

	transition: transform 0.08s linear;

	&:hover {
		transform: ${({ $available }) => $available && "scale(1.1)" };
	}
`