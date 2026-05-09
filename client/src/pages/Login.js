import { useState } from "react"; 

import { useNavigate, Link } from "react-router-dom"; 
import { login } from "../api/auth"; 

//import components to be used here
import Button from "../components/Button";
import Input from "../components/Input";

function Login(){ //redirect user to home/feed page

    const navigate = useNavigate(); //redirect user

    //storing email
    const [email, setEmail] = useState("");
    //store password
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function loginSubmission(e) {
        e.preventDefault(); //for page reload
        try{
            //send user data to backend 
            await login({email, password});
            
            //navigate user to the feed/home page 
            navigate("/feed")
        }
        catch (err){ //catch error
            alert(err.response?.data?.error || "Login Failed")
        }
    }//submit function
    
    //forms buttons and styling
    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100"> {/* centering */}
        
        <form onSubmit={loginSubmission} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow"> 
            {/*run submission button function for registeration*/}

            <h1 className="flex justify-center text-2xl font-bold mb-4 ">
                Login
            </h1>

            {/* using Input component */}

            
        <div className="space-y-4"> {/*adding space */}
            {/* for email*/}
            <Input
            placeholder = "Emial"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            />

            {/* for password*/}
            <div className="relative">
                <Input 
                type={showPassword ? "text" : "password"}
                placeholder = "Password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
            /> 
            {/*additonal button to let user show password */}
            <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-sm text-gray-500"
            >
                {showPassword ? "Hide" : "Show"}

            </button>
            </div>
            

            {/*button for submission */}
            <Button type="submit">
                Login
            </Button>
        </div>

            {/* redirect user to login if they have ab account with us */}

            <p className="mt-4 text-sm">
                Don't have an account? {""}
                <Link to="/register" className="underline">
                Register
                </Link>
            </p>

        </form>
        </div>
    );
}
export default Login;