function Input({ type = "test", placeholder, value, onChange}){
    return (
        <input
        type={type} //type
        placeholder={placeholder}//hold text
        value={value} //input value
        onChange={onChange} //update input when user type
        className='w-full rounded-xl border px-4 py-2' //maybe add ${className} for modification eg Input className='mb-4'
        //tailwind styling
                />
    );
}

export default Input;