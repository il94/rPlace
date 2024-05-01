import styled from "styled-components";
import colors from "../../utils/colors";

export const Style = styled.div.attrs<{ $backgroundColor: string, $focused: boolean }>((props) => ({
    style: {
        backgroundColor: props.$backgroundColor,
    }
}))`

	position: relative;
	z-index: ${({ $backgroundColor }) => $backgroundColor === colors.palette.White ? 0 : 1 };

    width: 2.5%;
    height: 2.5%;

	border-radius: ${({ $focused }) => $focused && 2.5 }px;
	box-shadow: ${({ $focused }) => $focused && "0 0 0 2px black, 0 0 0 3.5px white" };

	outline: none;

	transition: transform 0.1s linear;

	&:hover {
		z-index: 2;

		cursor: pointer;
	}

	&:focus {
		z-index: 3;
	}

	&:hover,
	&:focus {
		transform: ${({ $backgroundColor }) => $backgroundColor !== colors.palette.White && "scale(1.5)" };
	}
`