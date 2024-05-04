import { Role } from "../../../../utils/enums";
import { ColorValue, CrownImage, Style, Username } from "./style";
import CrownIcon from "../../../../assets/crown.png"

type PropsCellPopupData = {
	color: string,
	username: string,
	role: Role,
	history?: boolean
}

function CellPopupData({ color, username, role, history }: PropsCellPopupData) {
	return (
		<Style $history={history}>
			{
				role === Role.ADMIN &&
				<CrownImage src={CrownIcon} $history={history} />
			}
			<Username $color={role === Role.ADMIN} $history={history}>
				{username}
			</Username>
			<ColorValue $backgroundColor={color} $history={history} />
		</Style>
	)
}

export default CellPopupData