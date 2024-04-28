import styled from "styled-components";

export const Style = styled.div`
	display: flex;
	flex-direction: column;

	position: absolute;
	left: 50%;
	bottom: 20px;
	transform: translateX(-50%);
	z-index: 999;

	max-width: 150px;
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
		bottom: 1px;
		left: 50%;
		transform: translate(-50%, 50%);

		width: 20px;
		height: 22.5px;
		
		box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);

		clip-path: polygon(90% 50%, 0 50%, 50% 100%);

		content: "";
	
		overflow: hidden;

		background-color: inherit;
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
	flex-direction: column;
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