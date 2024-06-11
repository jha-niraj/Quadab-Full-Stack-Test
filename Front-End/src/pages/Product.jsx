import { Link, useNavigate } from "react-router-dom";

const Product = ({ productId, image, name, price, onClick }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex items-center justify-center shadow-2xl rounded-lg">
            <div className="flex items-center justify-center p-5">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <div onClick={() => navigate(`/product/${productId}`)} className="cursor-pointer rounded-lg hover:scale-105 transition-all duration-500">
                        <img
                            src={image}
                            alt={name}
                            className="w-72 h-72 rounded-lg object-fit aspect-square transition-all"
                        />
                    </div>
                    <div className="flex gap-2 flex-col w-full">
                        <h3 className="font-bold text-2xl">{name}</h3>
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">Rs. {price * 10}</span>
                            <button variant="outline" onClick={() => onClick()} className="bg-black text-white p-2 rounded-lg">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product;