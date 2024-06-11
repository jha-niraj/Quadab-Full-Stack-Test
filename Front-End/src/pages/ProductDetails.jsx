import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { productId } = useParams();
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

    console.log(productDetail);

    return (
        <div className="flex h-screen items-center justify-center">
        {
            productDetail.length !== 0 ? 
            <section className="bg-gray-200 py-12 md:py-20 lg:py-24 rounded-lg">
                <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div>
                        <img
                            src={productDetail.image}
                            alt="Product Image"
                            width={600}
                            height={600}
                            className="w-full rounded-lg overflow-hidden"
                        />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{productDetail.title}</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl">{productDetail.description}</p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Rs. {productDetail.price * 10}</h1>
                        <button size="lg" className="w-full text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl px-5 py-2.5 me-2 mb-2 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add to Cart</button>
                    </div>
                </div>
            </section>
            :
            <div>Loading...</div>
        }
        </div>
    )
}

export default ProductDetails;