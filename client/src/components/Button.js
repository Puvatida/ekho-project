function Button({ children, type = "button", onClick}){ //should be text inside each buttons
    return (
        <button
        type={type} //type
        onClick={onClick}
        className='w-full rounded-xl bg-blue-600 text-black py-2'
        //tailwind styling
        >
                {children}
                {/* text for the buttin */}
                </button>
    );
}

export default Button;