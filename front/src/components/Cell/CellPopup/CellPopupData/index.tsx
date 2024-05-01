import { ColorValue, Style, Username } from "./style";

type PropsCellPopupData = {
	color: string,
	username: string,
	history?: boolean
}

function CellPopupData({ color, username, history }: PropsCellPopupData) {
	return (
		<Style $history={history}>
			<Username $history={history}>
				{username}
			</Username>
			<ColorValue $backgroundColor={color} $history={history} />
		</Style>
	)
}

export default CellPopupData