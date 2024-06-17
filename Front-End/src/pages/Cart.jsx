import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from "../App";
import CartProductDetails from '../components/CartProductDetails';

const Cart = () => {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);

    const { userAuth, userAuth: { token, userId } } = useContext(UserInfo);

    useEffect(() => {
        const fetchCartProducts = async () => {
            console.log(userId);
            try {
                if(token && userId) {
                    const response = await axios.post('http://localhost:5001/user/personalcart', {
                        userId
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setCartProducts(response.data.userProducts);
                }
            } catch (error) {
                console.error("Error: ", error);
            }
        };

        fetchCartProducts();
    }, [userId, token]);

    console.log(cartProducts);

    return (
        <div className='flex flex-col items-center gap-5 w-full justify-center'>
            <div>
                <h1 className='text-4xl font-bold'>User's Cart</h1>
            </div>
            <div className='w-full'>
                {
                    cartProducts && cartProducts.length > 0 ?
                        <section className="flex flex-col items-center justify-center gap-5 w-full p-2">
                            {
                                cartProducts.map((product, index) => {
                                    return (
                                        <CartProductDetails key={index} productId={product.productId} quantity={product.quantity} />
                                    )
                                })
                            }
                        </section>
                        :
                        <div>
                            <h1>Please add some products on the Cart :)</h1>
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

export default Cart;