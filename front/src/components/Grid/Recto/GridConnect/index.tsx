import { FormEvent, useContext, useState } from "react";
import { Form, Input, Label, LabelInput, Inputs, RedirectMessage, ErrorMessage, ActiveText } from "./style";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Page } from "../../../../utils/enums";
import { GridTilte, Button } from "../style";
import { GridContext } from "../../../../contexts/GridContext";
import { AuthContext } from "../../../../contexts/AuthContext";
import Cookies from "js-cookie";
import { ErrorResponse } from "../../../../utils/types";
function GridConnect() {

	const { setUserDatas } = useContext(AuthContext)
	const { pageToDisplay, setPageToDisplay } = useContext(GridContext)

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [retypePassword, setRetypePassword] = useState('')
	const [error, setError] = useState('')

	function capitalize(s: string) {
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	function setCookieExpirationDate(): Date {
		const expirationDate = new Date()
		expirationDate.setTime(expirationDate.getTime() + (24 * 60 * 60 * 1000))

		return (expirationDate)
	}

	async function submitDatas(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		try {

			let authResponse: AxiosResponse

			if (pageToDisplay === Page.SIGNIN) {
				authResponse = await axios.post(`${import.meta.env.VITE_URL_BACK}/auth/signin`, {
					username: username,
					password: password,
				})
			}
			else {
				if (password !== retypePassword) {
					setError("Passwords are different")
					return
				}
				authResponse = await axios.post(`${import.meta.env.VITE_URL_BACK}/auth/signup`, {
					username: username,
					password: password,
				})
			}

			Cookies.set("access_token", authResponse.data.token, { expires: setCookieExpirationDate() })
			setUserDatas(authResponse.data.user)
			setPageToDisplay(Page.HOME)
		}
		catch (error) {
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError<ErrorResponse>
				const { statusCode, message } = axiosError.response?.data!
				if (statusCode === 400)
					setError(message[0])
				else if (statusCode === 404 || statusCode === 409)
					setError(message)
			}
		}
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
							onFocus={() => setError('')} />
						</LabelInput>
					<LabelInput>
						<Label>Password</Label>
						<Input type="password"value={password}
							onChange={(event) => setPassword(event.target.value)} 
							onFocus={() => setError('')} />
					</LabelInput>
					{
						pageToDisplay === Page.SIGNUP &&
						<LabelInput>
							<Label>Re-type password</Label>
							<Input type="password" value={retypePassword}
								onChange={(event) => setRetypePassword(event.target.value)}
								onFocus={() => setError('')} />
						</LabelInput>
					}
				</Inputs>
				<ErrorMessage>{ capitalize(error) }</ErrorMessage>
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