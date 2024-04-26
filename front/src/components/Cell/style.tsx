import styled from "styled-components";

export const Style = styled.button.attrs<{ $backgroundColor: string }>((props) => ({
    style: {
        backgroundColor: props.$backgroundColor,
    }
}))`
    width: 16px;
    height: 16px;

	transition: transform 0.1s linear;

	&:hover {
		transform: scale(1.5);
	}
`