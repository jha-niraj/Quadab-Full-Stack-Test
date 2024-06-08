import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { UserInfo } from "../pages/HomePage";

function Navbar() {	
	const [ navbarVisible, setNavbarVisible ] = useState(false);
	const navigate = useNavigate();
	const {userAuth } = useContext(UserInfo);

	const handleAuthentication = () => {
		navigate("/signin");
	}
	return (
		<div className="flex flex-col items-center justify-between w-full mt-2">
			<div className="flex items-center justify-between w-full">
				<div className="">
					<h1 className="text-3xl font-bold">Shop More</h1>
				</div>
				<div className="hidden sm:flex items-center w-[50%] p-2 justify-center gap-7">
					<a className="text-xl font-medium p-1 hover:bg-black hover:rounded-lg transition-all duration-300 hover:text-white cursor-pointer">Home</a>
					<a className="text-xl font-medium p-1 hover:bg-black hover:rounded-lg transition-all duration-300 hover:text-white cursor-pointer">Products</a>
					<a className="text-xl font-medium p-1 hover:bg-black hover:rounded-lg transition-all duration-300 hover:text-white cursor-pointer">Contact</a>
				</div>
				<div className="flex items-center justify-start gap-3">
					<button onClick={() => navigate("/cart")} className="flex items-center justify-end">
						<ShoppingCart size={40} />
						<div className="absolute right-18 top-1 bg-red-500 rounded-full w-5 text-center">0</div>
					</button>
					{
						userAuth ? <div className="bg-black sm:flex items-center justify-center w-10 hidden text-white p-2 rounded-full">
							<h1 className="text-xl fon-bold">N</h1>
						</div>
						:
						<button onClick={handleAuthentication} className="bg-black hidden sm:flex text-white rounded-lg p-3 font-bold hover:bg-blue-300 hover:text-black transition-all duration-500">Login</button>
					}
					<button className="flex sm:hidden" onClick={() => setNavbarVisible(c => !c)}>
						<Menu />
					</button>
				</div>
			</div>
			<div className={`flex-col items-end justify-end w-full sm:hidden ${navbarVisible ? "flex" : "hidden"} animate-slide-in-from-left transition-all`}>
                <ul className="flex flex-col items-end justify-center w-[40%] gap-1">
                    <li className="text-mini hover:bg-black hover:text-white hover:scale-105 rounded-lg p-2 transition-all duration-500">
                        <Link to="/">Home</Link>
                    </li>                                
                    <li className="text-mini hover:bg-black hover:text-white hover:scale-105 rounded-lg p-2 transition-all duration-500">
                        <Link to="/products">Products</Link>
                    </li>                    
                    <li className="text-mini hover:bg-black hover:text-white hover:scale-105 rounded-lg p-2 transition-all duration-500">
                        <Link to="/contact">Contact</Link>
                    </li>    
					{
						userAuth ? <div className="hover:bg-black hover:text-white w-10 flex items-center cursor-pointer justify-center hover:scale-105 rounded-full p-2 transition-all duration-500">
							<h1>N</h1>
						</div>
						:
						<button onClick={handleAuthentication} className="bg-black text-white rounded-lg p-3 font-bold hover:bg-blue-300 hover:text-black transition-all duration-500">Login</button>
					}
                </ul>
            </div>
		</div>
	);
}

export default Navbar;
