import { useState, useEffect, useContext } from "react";
import { UserInfo } from "../App";
import axios from "axios";

const CartProductDetails = ({ productId, quantity }) => {
    const [productDetail, setProductDetail] = useState([]);
    const { userAuth, userAuth: { token } } = useContext(UserInfo);

    console.log(token);

    useEffect(() => {
        const fetchedProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/user/products/${productId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                setProductDetail(response.data.product);
            } catch(err) {
                console.log("Error: " + err);
            }
        }
        fetchedProductDetails();
    }, [productId]);

    console.log(productDetail);

    return (
        <div className='flex items-center justify-between p-2 w-full border-2 border-gray-200 shadow-2xl rounded-lg'>
            <img src={productDetail.image} className="w-36 rounded-lg" />
            <div className='flex flex-col gap-3 items-center'>
                <h3 className='text-2xl font-bold'>{productDetail.title}</h3>
                <p>Quantity: {quantity}</p>
            </div>
            <div className='flex flex-col items-center gap-3'>
                <p>Price: Rs. <span className='text-xl font-bold'>{productDetail.price * 10}</span></p>
                <button size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800">Remove from Cart</button>
            </div>
        </div>
    );
};

export default CartProductDetails;