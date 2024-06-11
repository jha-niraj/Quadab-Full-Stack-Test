import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([
        {
            image:
                "https://th.bing.com/th/id/OIP._BwdoZP9-VyqLAj44k9EiwHaE8?w=279&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "Shoes - 1",
            description: "Shoes from Nepal",
            price: 100,
        },
        {
            image:
                "https://th.bing.com/th/id/OIP._BwdoZP9-VyqLAj44k9EiwHaE8?w=279&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "Shoes - 1",
            description: "Shoes from Nepal",
            price: 100,
        },
        {
            image:
                "https://th.bing.com/th/id/OIP._BwdoZP9-VyqLAj44k9EiwHaE8?w=279&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7",
            title: "Shoes - 1",
            description: "Shoes from Nepal",
            price: 100,
        },
    ]);

    // useEffect(() => {
    //     const fetchCartProducts = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:5001/user/cart`, {
    //                 headers: {
    //                     "Authorization": `Bearer `
    //                 }
    //             })
    //             setCartProducts(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };

    //     fetchCartProducts();
    // }, []);

    return (
        <div className='flex flex-col items-center gap-5 w-full justify-center'>
            <div>    
                <h1 className='text-4xl font-bold'>User's Cart</h1>
            </div>
            <div className='w-full'>
                {
                    cartProducts.length !== 0 ? 
                    <section className="flex flex-col items-center justify-center gap-5 w-full p-2">
                        {
                            cartProducts.map((product, index) => {
                                return (
                                    <CartProductDetails key={index} image={product.image} title={product.title} description={product.description} price={product.price} />
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
            </div>
            <div className='flex items-center justify-between w-full p-2'>
                <button onClick={() => navigate("/")} size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go Back</button>
                <h1 className='text-2xl font-bold'>Sub Total: <span className='text-blue-800'>3000</span></h1>
                <button onClick={() => navigate("/checkout")} size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continue</button>
            </div>
        </div>
    );
};

const CartProductDetails = ({ image, title, description, price }) => {
    return (
        <div className='flex items-center justify-between p-2 w-full border-2 border-gray-200 shadow-2xl rounded-lg'>
            <img src={image} alt={title} className="w-60" />
            <div className='flex flex-col gap-3 items-center'>
                <h3 className='text-2xl font-bold'>{title}</h3>
                <p>{description}</p>
            </div>
            <div className='flex flex-col items-center gap-3'>
                <p>Price: Rs. <span className='text-xl font-bold'>{price * 10}</span></p>
                <button size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800">Remove from Cart</button>
            </div>
        </div>
    );
};

export default Cart;