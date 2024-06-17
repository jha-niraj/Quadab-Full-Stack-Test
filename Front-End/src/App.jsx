import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from "react-router-dom";
import "./index.css"

import HomePage from "./pages/HomePage";
import UserAuthentication from "./pages/Authentication";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import { lookInSession } from './common/session';

export const UserInfo = createContext({});

function App() {
	const [ userAuth, setUserAuth ] = useState({});

	useEffect(() => {
		const userInSession = lookInSession("userInfo");
		userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({ token: null })
	}, [])

	console.log(userAuth);

    return (
		<UserInfo.Provider value={{ userAuth, setUserAuth }}>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signup" element={<UserAuthentication type="signup" />} />
				<Route path="/signin" element={<UserAuthentication type="signin" />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/product" element={<Product />} />
				<Route path="/product/:productId" element={<ProductDetails /> } />
				<Route path="/cart" element={<Cart /> } />
				<Route path="/cart/:productId" element={<ProductDetails />} />
				<Route path="/checkout" element={<Checkout />} />
			</Routes>
		</UserInfo.Provider>
    )
}

export default App;
