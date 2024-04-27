import styled from "styled-components";

export const Style = styled.div`
	display: flex;
	flex-wrap: wrap;

	/* @media screen and (max-width: 480px) {
		width: 320px;		
	}
	@media screen and (max-width: 640px) {
		width: 480px;		
	} */
	/* @media screen and (min-width: 640px) { */
		width: 640px;		
	/* } */

	aspect-ratio: 1;
	/* height: 640px; */
	border: solid 8px black;

	overflow: scroll;

	&::-webkit-scrollbar {
		display: none;
	}
`

export const DrawingBoard = styled.div<{ $zoom: boolean }>`
	display: flex;
	flex-wrap: wrap;

	width: 100%;
	height: 100%;

	transform: ${({$zoom}) => $zoom && "scale(2)"};

	transform-origin: center;


`