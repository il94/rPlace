import { useContext, useEffect } from "react";
import { Style } from "./style";
import GridConnect from "./GridConnect";
import { Page } from "../../../utils/enums";
import GridHome from "./GridHome";
import { GridContext } from "../../../contexts/GridContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
import { ErrorResponse, User } from "../../../utils/types";

function Recto() {

	const { flip, display, pageToDisplay, setPageToDisplay } = useContext(GridContext)
	const { setUserDatas } = useContext(AuthContext)

	useEffect(() => {
		async function verifyToken() {
			try {
				const userResponse: AxiosResponse<User> = await axios.get(`${import.meta.env.VITE_URL_BACK}/auth`, {
					headers: {
						'Authorization': `Bearer ${Cookies.get("access_token")}`
					}
				})

				setUserDatas(userResponse.data)
				setPageToDisplay(Page.HOME)
			}
			catch (error) {
				if (axios.isAxiosError(error)) {
					const axiosError = error as AxiosError<ErrorResponse>
					const { statusCode, message } = axiosError.response?.data!
					if (statusCode === 401)
						console.error(message)
				}
				Cookies.remove("access_token")
			}
		}

		verifyToken()
	}, [])

	return (
		<Style $flip={flip} $display={display}>
			{
				pageToDisplay === Page.SIGNIN || pageToDisplay === Page.SIGNUP ?
					<GridConnect />
				: pageToDisplay === Page.HOME ?
					<GridHome />
				:
				null
			}
		</Style>
	)
}

export default Recto