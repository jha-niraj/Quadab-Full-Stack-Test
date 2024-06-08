const Button = ({onClick, label}) => {
    return (
        <div>
            {
                label == "signup" ? <ButtonUi onClick={onClick} text="Sign Up" /> : <ButtonUi onClick={onClick} text="Sign In" />
            }
        </div>
    )
}

const ButtonUi = ({text, onClick}) => {
    return (
        <button onClick={onClick} type="button" className="w-full text-white bg-black hover:bg-blue-800 font-bold rounded-lg text-xl px-5 py-2.5 me-2 mb-2 transition-all dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{text}</button>
    )
}

export default Button;