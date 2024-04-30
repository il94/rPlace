import colors from "../../utils/colors";
import { Content, Style, StyleSquare } from "./style";

type PropsSquare = {
	delay: number,
	color: string
}
function Square({ delay, color }: PropsSquare) {
	return (
		<StyleSquare>
			<Content $delay={delay} $backgroundColor={color} />
		</StyleSquare>
	)
}

function Loader() {
	return (
		<Style>
			<Square delay={0} color={colors.loader.first} />
			<Square delay={0.2} color={colors.loader.second} />
			<Square delay={0.4} color={colors.loader.third} />
			<Square delay={0.2} color={colors.loader.second} />
			<Square delay={0.4} color={colors.loader.third} />
			<Square delay={0.6} color={colors.loader.fourth} />
			<Square delay={0.4} color={colors.loader.third} />
			<Square delay={0.6} color={colors.loader.fourth} />
			<Square delay={0.8} color={colors.loader.fifth} />
		</Style>
	)
}

export default Loader