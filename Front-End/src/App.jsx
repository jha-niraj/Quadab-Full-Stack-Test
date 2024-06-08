import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import "./index.css"

import HomePage from "./pages/HomePage";
import UserAuthentication from "./pages/Authentication";

function App() {
    return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/signup" element={<UserAuthentication type="signup" />} />
			<Route path="/signin" element={<UserAuthentication type="signin" />} />
		</Routes>
    )
}

export default App;
