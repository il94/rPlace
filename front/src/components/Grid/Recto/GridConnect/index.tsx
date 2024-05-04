import { FormEvent, useContext, useState } from "react";
import { Form, Input, Label, LabelInput, Inputs, RedirectMessage, ErrorMessage, ActiveText } from "./style";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Page } from "../../../../utils/enums";
import { GridTilte, Button } from "../style";
import { ErrorResponse } from "../../../../utils/types";
import { GridContext } from "../../../../contexts/GridContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import Cookies from "js-cookie";
function GridConnect() {

	const { setUserDatas } = useContext(AuthContext)
	const { pageToDisplay, setPageToDisplay } = useContext(GridContext)

	const [username, setUsername] = useState('')
	const [usernameError, setUsernameError] = useState('')
	const [password, setPassword] = useState('')
	const [retypePassword, setRetypePassword] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [retypePasswordError, setRetypePasswordError] = useState('')

	function setCookieExpirationDate(): Date {
		const expirationDate = new Date()
		expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000))

		return (expirationDate)
	}

	async function signin() {
		try {
			const signinResponse: AxiosResponse = await axios.post(`${import.meta.env.VITE_URL_BACK}/auth/signin`, {
				username: username,
				password: password,
			})

			Cookies.set("access_token", signinResponse.data.token, { expires: setCookieExpirationDate() })
			setUserDatas(signinResponse.data.user)
			setPageToDisplay(Page.HOME)
		}
		catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError<ErrorResponse>
				const { statusCode, message } = axiosError.response?.data!
				if (statusCode === 400)
					setPasswordError(message[0])
				if (statusCode === 409)
					setUsernameError(message)	
			}
		}
	}

	async function signup() {
		try {
			if (password !== retypePassword) {
				setRetypePasswordError("Passwords are different")
				return
			}
			const signupResponse: AxiosResponse = await axios.post(`${import.meta.env.VITE_URL_BACK}/auth/signup`, {
				username: username,
				password: password,
			})

			Cookies.set("access_token", signupResponse.data.token, { expires: setCookieExpirationDate() })
			setUserDatas(signupResponse.data.user)
			setPageToDisplay(Page.HOME)
		}
		catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError<ErrorResponse>
				const { statusCode, message } = axiosError.response?.data!
				if (statusCode === 400)
					setPasswordError(message[0])
				if (statusCode === 409)
					setUsernameError(message)	
			}
		}
	}

	async function submitDatas(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		pageToDisplay === Page.SIGNIN ? signin() : signup()
	}

	return (
		<>
			<GridTilte>{ pageToDisplay === Page.SIGNIN ? "Signin" : "Signup"}</GridTilte>
			<Form onSubmit={(event) => submitDatas(event)}>
				<Inputs>
					<LabelInput>
						<Label>Username</Label>
						<Input value={username}
							onChange={(event) => setUsername(event.target.value)}
							onFocus={() => setUsernameError('')} />
						<ErrorMessage>{ usernameError }</ErrorMessage>
						</LabelInput>
					<LabelInput>
						<Label>Password</Label>
						<Input type="password"value={password}
							onChange={(event) => setPassword(event.target.value)} 
							onFocus={() => {setPasswordError(''); setRetypePasswordError('')}} />
						<ErrorMessage>{ passwordError }</ErrorMessage>
					</LabelInput>
					{
						pageToDisplay === Page.SIGNUP &&
						<LabelInput>
							<Label>Re-type password</Label>
							<Input type="password" value={retypePassword}
								onChange={(event) => setRetypePassword(event.target.value)}
								onFocus={() => {setPasswordError(''); setRetypePasswordError('')}} />
							<ErrorMessage>{ retypePasswordError }</ErrorMessage>
						</LabelInput>
					}
				</Inputs>
				<Button type="submit">{ pageToDisplay === Page.SIGNIN ? "Signin" : "Signup" }</Button>
				<RedirectMessage>
				{
					pageToDisplay === Page.SIGNIN ?
					<>
						Don't have an account?&nbsp;
						<ActiveText onClick={() => setPageToDisplay(Page.SIGNUP)}>Sign up</ActiveText>
					</>
					:
					<>
						Already have an account?&nbsp;
						<ActiveText onClick={() => setPageToDisplay(Page.SIGNIN)}>Sign in</ActiveText>
					</>
				}
				</RedirectMessage>
			</Form>
		</>
	)
}

export default GridConnect