import styled from "styled-components";

export const Style = styled.div<{ $left?: number, $top?: number }>`

	display: flex;
	justify-content: center;
	align-items: center;
	/* flex-wrap: wrap; */

	position: absolute;
	left: ${({ $left }) => $left}px;
	top: ${({ $top }) => $top}px;
	z-index: 999;

	/* margin: 5px; */

	width: 300px;
	height: 70px;

	border-radius: 15px;

	border-radius: 15px;

	box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);

	background-color: #f9dcbf;
`

export const Interfaces = styled.div`
	
	display: flex;
	

	width: calc(100% - 20px);
	height: calc(100% - 10px);

`

export const Colors = styled.div`
	
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	
	width: 30%;
	height: 100%;

`