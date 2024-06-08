
import { useState, createContext, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserInfo = createContext();

function LandingPage() {
	const [ userAuth, setUserAuth ] = useState("");

	useEffect(() => {
		const userData = localStorage.getItem("token");
		setUserAuth(userData);
	}, [])

	console.log(userAuth);

	return (
		<UserInfo.Provider value={{ userAuth }}>
			<div className='w-[99%] flex flex-col'>
				<div className='w-full'>
					<Navbar />
				</div>
			</div>
		</UserInfo.Provider>	
	);
}

export default LandingPage;
