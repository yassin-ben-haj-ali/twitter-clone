import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login/loginPage";
import SignUpPage from "./pages/auth/signup/signUpPage";
import HomePage from "./pages/home/homePage";

function App() {
	return (
		<div className='flex max-w-6xl mx-auto'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;