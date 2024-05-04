import styled from "styled-components";
import colors from "../../../../utils/colors";

export const Style = styled.div<{ $history?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: ${({ $history }) => $history ? 10 : 20}px;

	background-color: ${({ $history }) => !$history && colors.popup.banner };
`

export const CrownImage = styled.img<{ $history?: boolean }>`

	position: absolute;
	left: ${({ $history }) => $history ? 12 : 8}px;
	/* margin-left: 8px; */

	height: ${({ $history }) => $history ? 7.5 : 15}px;

`

export const Username = styled.p<{ $color: boolean, $history?: boolean }>`
	display: flex;
	justify-content: center;

	width: 100%;
	margin-left: 8px;

	font-size: ${({ $history }) => $history ? 10 : 12}px;
	text-align: center;

	color: ${({ $color }) => $color && "red" };
`

export const ColorValue = styled.div<{ $backgroundColor: string, $history?: boolean }>`
	min-width: ${({ $history }) => $history ? 4 : 8}px;
	height: ${({ $history }) => $history ? 4 : 8}px;

	margin-left: ${({ $history }) => $history ? 5 : 4}px;
	margin-right: ${({ $history }) => $history ? 9.75 : 8}px;

	border: solid 1.5px ${colors.borders.cell};
	border-radius: 2.5px;

	background-color: ${({ $backgroundColor }) => $backgroundColor};
`