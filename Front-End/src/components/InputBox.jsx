const InputBox = ({name, type, id, value, placeholder, onChange}) => {
    return (
        <div className="flex flex-col">
            <input 
                name={name}
                type={type}
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className="input-box m-3 border-2 border-gray-200 rounded-md p-1"
            />
        </div>
    )
}

export default InputBox;