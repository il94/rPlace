import styled, { keyframes } from "styled-components";

export const Style = styled.div`
	display: flex;
	flex-wrap: wrap;

	width: 150px;
	height: 150px;
`

const loader = keyframes`
	0% {
		width: 50px;
		height: 50px;
	}
	30% {
		width: 15px;
		height: 15px;
	}
	60% {
		width: 50px;
		height: 50px;
	}
`

export const StyleSquare = styled.div`

	display: flex;
	justify-content: center;
	align-items: center;
	
	width: 50px;
	height: 50px;

`

export const Content = styled.div<{ $delay: number, $backgroundColor: string }>`
	width: 50px;
	height: 50px;

	background-color: ${({ $backgroundColor }) => $backgroundColor };

	transform-origin: center;

	animation: ${loader} 2s linear infinite ;
	animation-delay:  ${({ $delay }) => $delay }s;
`