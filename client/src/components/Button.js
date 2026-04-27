function Button({ children, type = "button"}){ //should be text inside each buttons
    return (
        <button
        type={type} //type
        className='w-full rounded-xl bg-red-600 text-black py-2'
        //tailwind styling
        >
                {children}
                {/* text for the buttin */}
                </button>
    );
}

export default Input;