import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Form, Input, Label, LabelInput, Inputs, RedirectMessage, ErrorMessage, ActiveText } from "./style";
import axios from "axios";
import { Pages } from "../../../../utils/enums";
import { GridTilte, Button } from "../style";

type PropsGridConnect = {
	pageToDisplay: Pages,
	setPageToDisplay: Dispatch<SetStateAction<Pages>>
}
function GridConnect({ pageToDisplay, setPageToDisplay }: PropsGridConnect) {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [retypePassword, setRetypePassword] = useState('')

	async function signin() {
		await axios.post(`${import.meta.env.VITE_URL_BACK}/auth/signin`, {
			username: username,
			password: password,
		},
		{
			withCredentials: true
		})
	}

	async function signup() {
		await axios.post(`${import.meta.env.VITE_URL_BACK}/auth/signup`, {
			username: username,
			password: password,
		},
		{
			withCredentials: true
		})
	}

	async function submitDatas(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (pageToDisplay === Pages.SIGNIN)
			signin()
		else
			signup()
	}

	function switchPage() {
		if (pageToDisplay === Pages.SIGNIN)
			setPageToDisplay(Pages.SIGNUP)
		else
			setPageToDisplay(Pages.SIGNIN)
	}

	return (
		<>
			<GridTilte>{ pageToDisplay === Pages.SIGNIN ? "Signin" : "Signup"}</GridTilte>
			<Form onSubmit={(event) => submitDatas(event)}>
				<Inputs>
					<LabelInput>
						<Label>Username</Label>
						<Input onChange={(event) => setUsername(event.target.value)} value={username} />
						{/* <ErrorMessage>{ "error" }</ErrorMessage> */}
						</LabelInput>
					<LabelInput>
						<Label>Password</Label>
						<Input type="password" onChange={(event) => setPassword(event.target.value)} value={password} />
						{/* <ErrorMessage>{ "error" }</ErrorMessage> */}
					</LabelInput>
					{
						pageToDisplay === Pages.SIGNUP &&
						<LabelInput>
							<Label>Re-type password</Label>
							<Input type="password" onChange={(event) => setRetypePassword(event.target.value)} value={retypePassword} />
							{/* <ErrorMessage>{ "error" }</ErrorMessage> */}
						</LabelInput>
					}
				</Inputs>
				<Button type="submit">{ pageToDisplay === Pages.SIGNIN ? "Signin" : "Signup" }</Button>
				<RedirectMessage>
				{
					pageToDisplay === Pages.SIGNIN ?
					<>
						Don't have an account?&nbsp;
						<ActiveText onClick={switchPage}>Sign up</ActiveText>
					</>
					:
					<>
						Already have an account?&nbsp;
						<ActiveText onClick={switchPage}>Sign in</ActiveText>
					</>
				}
				</RedirectMessage>
			</Form>
		</>
	)
}

export default GridConnect