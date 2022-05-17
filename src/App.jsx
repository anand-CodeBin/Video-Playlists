import LoginPage from "./pages/Login/LoginPage";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/Home";

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LoginPage />}></Route>
						<Route path="/home" element={<HomePage />}></Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
