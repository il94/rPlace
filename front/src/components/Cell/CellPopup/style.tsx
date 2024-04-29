import styled from "styled-components";

export const Style = styled.div<{ $left?: number, $top?: number, $reverse?: boolean  }>`
	display: flex;
	flex-direction: column-reverse;

	position: absolute;

	left: ${({ $left }) => $left}px;
	top: ${({ $top }) => $top}px;
	z-index: 999;
	transform: ${({ $reverse }) => $reverse ? "translateY(0)" : "translateY(-100%)"} ;

	width: 150px;
	min-height: 30px;
	max-height: 70px;

	border-radius: 15px;

	box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);

	background-color: #f9dcbf;

	&:hover {
		background-color: #f6c491;
	}

	&::before {
		position: absolute;
		top: ${({ $reverse }) => $reverse && 1}px ;
		bottom: ${({ $reverse }) => !$reverse && 1}px ;
		left: 50%;
		transform: ${({ $reverse }) => $reverse ? "translate(-50%, -50%) rotate(180deg)" : "translate(-50%, 50%)"} ;

		width: 20px;
		height: 22.5px;
		
		box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);

		clip-path: polygon(90% 50%, 0 50%, 50% 100%);

		content: "";
		overflow: hidden;

		background-color: ${({ $reverse }) => $reverse ? "#fcd4ad" : "inherit"};
	}
`

export const WrapperBorder = styled.div`
	width: 100%;
	height: 100%;

	border-radius: 15px;

	overflow: hidden;
`

export const History = styled.button<{ $open: boolean }>`
	display: flex;
	flex-direction: column-reverse;
	justify-content: center;
	
	width: 100%;
	min-width: 70px;
	max-height: ${({ $open }) => $open ? 50 : 10 }px;

	font-size: 7px;

	& > p {
		width: 100%;
		height: 10px;

		text-align: center;
	}
`