import styled from "styled-components";
import colors from "../../../../utils/colors";

export const Style = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;

	position: relative;

	background-color: #272727;
`

export const Form = styled.form`
	
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	border-radius: 5px;

	height: 75%;

	color: ${colors.text.alt};

`

export const Inputs = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;


	height: 70%;

`

export const LabelInput = styled.div`
	
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: 90px;
`

export const Label = styled.label`
	font-size: 24px;
	
`

export const Input = styled.input`
	
	/* width: ${(props) => props.width ? props.width + "px" : "100%" }; */

	border: none;
	/* border-bottom: 1px solid ${(props) => props.$disable ? colors.textBlocked : props.$error && colors.textError}; */
	border-bottom: 1px solid ${colors.text.alt};

	/* cursor: ${(props) => props.$disable && "default"}; */

	font-size: 28px;
	/* font-size: ${(props) => props.fontSize ? props.fontSize : props.width && props.width / 12}px; */
	text-align: center;

	/* color : ${(props) => props.$disable && colors.textBlocked}; */
	color : ${colors.text.alt};
	/* background-color: inherit; */

	/* &::placeholder {
		font-size: ${(props) => props.fontSize && props.fontSize - 2}px;
	} */

	&:focus {
		outline: none;
		border-color: ${colors.button.form.default};
	}
`

export const ErrorMessage = styled.p`
	font-size: 16px;
	font-weight: lighter;
	color: #ff3434;
`

export const RedirectMessage = styled.p`
	cursor: default;
`

export const ActiveText = styled.span`
	cursor: pointer;

	color: ${colors.button.form.default};

	&:hover {
		color: ${colors.button.form.hover};
	}
`