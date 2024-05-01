import styled from "styled-components";
import colors from "../../utils/colors";

export const Style = styled.div<{ $left?: number, $top?: number }>`
	display: flex;
	justify-content: center;
	align-items: center;

	position: absolute;
	left: ${({ $left }) => $left}px;
	top: ${({ $top }) => $top}px;
	z-index: 999;

	width: 300px;
	height: 70px;

	border-radius: 15px;

	box-shadow: 2.5px 2.5px 0.5px rgba(0, 0, 0, 0.5);

	background-color: ${colors.popup.default};
`

export const Interfaces = styled.div`
	display: flex;
	align-items: center;

	width: calc(100% - 20px);
	height: calc(100% - 10px);
`

export const Colors = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;

	width: 84px;
	height: 100%;
`

export const Tools = styled.div`
	display: flex;
	flex-wrap: wrap;
	
	width: 72px;
	height: 100%;
`

export const Wallet = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 74px;
	height: 100%;

	& > img {
		width: 18px;
		height: 18px;
	}
`