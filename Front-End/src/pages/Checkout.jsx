import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen items-center justify-center gap-3">
            <h1 className="text-2xl font-bold">Your orders are being prepared and served!!!</h1>
            <button onClick={() => navigate("/")} size="lg" className="text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl p-2 w-40 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Main page</button>
            </div>
    )
}

export default Checkout;