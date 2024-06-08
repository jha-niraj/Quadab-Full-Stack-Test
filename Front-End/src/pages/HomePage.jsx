import { useState, createContext, useEffect } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../pages/Product";

export const UserInfo = createContext();

const HomePage = () => {
	const [ userAuth, setUserAuth ] = useState("");
	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		const userData = localStorage.getItem("token");
		setUserAuth(userData);
	}, [])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const allProducts = await axios.get("https://fakestoreapi.com/products?limit=10");
				setProducts(allProducts.data);
			} catch(err) {
				console.log("Error: " + err);
			}
		}	
		fetchProducts()
	}, [])

	const handleProductAddition = () => {
		alert("Nirakj")
	}
	
	return (
		<UserInfo.Provider value={{ userAuth }}>
			<div className='w-[99%] flex flex-col items-center'>
				<div className='w-full'>
					<Navbar />
				</div>
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%]">
					{
						products.map((product, index) => {
							return (
								<Product key={index} product={product} index={index} image={product.image} name={product.title} description={product.description} price={product.price} onClick={handleProductAddition} />
							)
						})
					}
				</section>
				<Footer />
			</div>
		</UserInfo.Provider>	
	);
}

export default HomePage;
