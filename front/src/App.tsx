import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./pages/Home"
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import background from "./utils/background";
import SocketProvider from "./contexts/AuthContext";
import Loader from "./components/Loader";
import GridProvider from "./contexts/GridContext";

function App() {
	const [init, setInit] = useState(false)

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadFull(engine)
		}).then(() => {
			setInit(true)
		})
	}, [])

	return (
		init ?
		<>
			<Particles id="tsparticles" options={background} />
			<SocketProvider>
				<GridProvider>
					<Router>
						<Routes>
								<Route path="/" element={<Home />} />
						</Routes>
					</Router>
				</GridProvider>
			</SocketProvider>
		</>
		: <Loader />
	)
}


export default App