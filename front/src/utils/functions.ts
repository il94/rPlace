export function randomHexColor(): string {
	const randomColor = Math.floor(Math.random() * 16777215).toString(16)
	return "#" + ("000000" + randomColor).slice(-6)
}