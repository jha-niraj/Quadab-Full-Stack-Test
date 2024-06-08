import { Link } from "react-router-dom";

const Product = ({ image, name, description, price, onClick }) => {
    return (
        <div className="w-full flex items-center justify-center shadow-2xl rounded-lg">
            <div className="flex items-center justify-center p-2">
                <div to="/product/:key" className="flex flex-col gap-5 items-center justify-center">
                    <Link to="/product/:key">
                        <img
                            src={image}
                            alt={name}
                            className="w-72 h-72 rounded-lg object-fit aspect-square transition-all"
                        />
                    </Link>
                    <div className="flex gap-2 flex-col">
                        <h3 className="font-semibold">{name}</h3>
                        <p className="text-sm text-gray-500">{description}</p>
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