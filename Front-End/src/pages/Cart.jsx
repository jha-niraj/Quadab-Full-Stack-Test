import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from "../App";

const Cart = () => {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState([]);

    const { userAuth } = useContext(UserInfo);
    console.log(userAuth.userId);

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/user/cart`, {
                    body: {
                        userId: userAuth.userId
                    },
                    headers: {
                        "Authorization": `Bearer ${userAuth.token}`
                    }
                })
                setCartProducts(response.data.userProducts);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCartProducts();
    }, []);

    console.log(cartProducts);

    return (
        <div className='flex flex-col items-center gap-5 w-full justify-center'>
            <div>
                <h1 className='text-4xl font-bold'>User's Cart</h1>
            </div>

            <div className='flex items-center justify-between w-full p-2'>
                <button onClick={() => navigate("/")} size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go Back</button>
                <h1 className='text-2xl font-bold'>Sub Total: <span className='text-blue-800'>3000</span></h1>
                <button onClick={() => navigate("/checkout")} size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continue</button>
            </div>
        </div>
    );
};

// <div className='w-full'>
//     {
//         cartProducts.length !== 0 ?
//             <section className="flex flex-col items-center justify-center gap-5 w-full p-2">
//                 {
//                     cartProducts.map((product, index) => {
//                         return (
//                             <CartProductDetails key={index} image={product.image} title={product.title} description={product.description} price={product.price} />
//                         )
//                     })
//                 }
//             </section>
//             :
//             <div>
//                 {
//                     products.msg
//                 }
//             </div>
//     }
// </div>

const CartProductDetails = ({ productId, image, title, description, price }) => {
    const [ productDetail, setProductDetail ] = useState([]);

    useEffect(() => {
        const fetchedProductDetails = async () => {
            const response = await axios.get(`http://localhost:5001/user/products/${productId}`, {
                headers: {
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZsYW1pbmdvQGdtYWlsLmNvbSIsImlhdCI6MTcxODA4OTcwMX0.TSMMoEjuJXJyIXfatGB8lAi8amXaeNgr4AKjUP7H8S8`
                }
            })
            setProductDetail(response.data.product);
        }
        fetchedProductDetails();
    }, [productId])  

    return (
        <div className='flex items-center justify-between p-2 w-full border-2 border-gray-200 shadow-2xl rounded-lg'>
            <img src={image} alt={title} className="w-60" />
            <div className='flex flex-col gap-3 items-center'>
                <h3 className='text-2xl font-bold'>{title}</h3>
                <p>{quantity}</p>
            </div>
            <div className='flex flex-col items-center gap-3'>
                <p>Price: Rs. <span className='text-xl font-bold'>{price * 10}</span></p>
                <button size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800">Remove from Cart</button>
            </div>
        </div>
    );
};

export default Cart;