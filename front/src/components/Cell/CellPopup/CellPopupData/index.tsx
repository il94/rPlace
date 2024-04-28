import { ColorValue, Style, Username } from "./style";

type PropsCellPopupData = {
	color: string,
	history?: boolean
}

function CellPopupData({ color, history }: PropsCellPopupData) {
	return (
		<Style $history={history}>
			<Username $history={history}>
				okooooooooooooooo
			</Username>
			<ColorValue $backgroundColor={color} $history={history} />
		</Style>
	)
}

export default CellPopupData