import styled from "styled-components";

export const Style = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	position: relative;

	width: 100%;
	height: 100%;
`

export const Title = styled.h1`
	position: absolute;
	top: 0px;
	left: 50%;
	transform: translateX(-50%);

	font-size: 48px;
	
	text-align: center;

	color: white;
`