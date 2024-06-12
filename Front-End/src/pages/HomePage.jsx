import { useState, createContext, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../pages/Product";

export const UserInfo = createContext({});

const HomePage = () => {
	const [ userAuth, setUserAuth ] = useState({});
	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userInfo"));
		setUserAuth(userData);
	}, [])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const allProducts = await axios.get("http://localhost:5001/user/products", 
					{
						headers: {
							"Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZsYW1pbmdvQGdtYWlsLmNvbSIsImlhdCI6MTcxODA4OTcwMX0.TSMMoEjuJXJyIXfatGB8lAi8amXaeNgr4AKjUP7H8S8`
						}
				})
				setProducts(allProducts.data.allProducts);
			} catch(err) {
				console.log("Error: " + err);
			}
		}	
		fetchProducts()
	}, [])

	const handleProductAddition = () => {

	}
	
	return (
		<UserInfo.Provider value={{ userAuth }}>
			<div className='w-[99%] flex flex-col gap-5 items-center'>
				<div className='w-full'>
					<Navbar />
				</div>
				<section className="flex items-center justify-center">
					{
						products ? 
						<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[90%]">
							{
								products.map((product, index) => {
									return (
										<Product key={index} productId={product._id} index={index} image={product.image} name={product.title} price={product.price} onClick={handleProductAddition} />
									)
								})
							}
						</section>
						: 
						<div>
							{
								products.msg
							}
						</div>
					}
				</section>
			</div>
		</UserInfo.Provider>	
	);
}

export default HomePage;
