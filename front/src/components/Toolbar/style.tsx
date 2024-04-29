import styled from "styled-components";

export const Style = styled.div<{ $left?: number, $top?: number, $right?: number, $bottom?: number }>`
	
	position: absolute;
	z-index: 999;

	width: 300px;
	height: 45px;

	left: ${({ $left }) => $left}px;
	top: ${({ $top }) => $top}px;
	right: ${({ $right }) => $right}px;
	bottom: ${({ $bottom }) => $bottom}px;

	border-radius: 15px;

	background-color: #f9b659;

`