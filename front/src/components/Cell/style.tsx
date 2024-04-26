import styled from "styled-components";

export const Style = styled.div.attrs<{ $backgroundColor: string }>((props) => ({
    style: {
        backgroundColor: props.$backgroundColor,
    }
}))`
    width: 8px;
    height: 8px;
`