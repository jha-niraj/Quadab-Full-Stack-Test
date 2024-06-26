import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Product from "../pages/Product";
import { UserInfo } from "../App";
import { Toaster, toast } from "react-hot-toast";

const HomePage = () => {
	const [products, setProducts] = useState([]);
	const { userAuth } = useContext(UserInfo);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const allProducts = await axios.get(
					"http://localhost:5001/user/products",
					{
						headers: {
							Authorization: `Bearer ${userAuth.token}`,
						},
					}
				);
				setProducts(allProducts.data.allProducts);
			} catch (err) {
				console.log("Error: " + err);
			}
		};
		fetchProducts();
	}, []);

	const handleProductAddition = async (userId, productId) => {
		console.log(userId);
		console.log(productId);
		try {
			await axios.post("http://localhost:5001/user/cart", {
				userId,
				productId
			}, {
				headers: {
					Authorization: `Bearer ${userAuth.token}`
				}
			})
			console.log("Products Added")
			toast.success("Produccts Added to the Cart");
		} catch(err) {
			console.log(err);
			toast.error("Error Occurred!!!");
		}
	};

	return (
		<div className="w-[99%] flex flex-col gap-5 items-center">
		<Toaster />
			<div className="w-full">
				<Navbar />
			</div>
			<section className="flex items-center justify-center">
				{products ? (
					<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[90%]">
						{products.map((product, index) => {
							return (
								<Product
									key={index}
									productId={product._id}
									index={index}
									image={product.image}
									name={product.title}
									price={product.price}
									onClick={() => handleProductAddition(userAuth.userId, product._id)}
								/>
							);
						})}
					</section>
				) : (
					<div>{products.msg}</div>
				)}
			</section>
		</div>
	);
};

export default HomePage;
