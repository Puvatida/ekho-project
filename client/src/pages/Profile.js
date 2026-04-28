import { useState, useEffect } from "react"; //store user input and api


import { useNavigate } from "react-router-dom"; //redirect user betwen pages
import { logout } from "../api/auth"; //function from auth.js api
import { viewOwnProfile, deleteOwnProfile } from "../api/users"; //function from users.js api

//import components to be used here
import Button from "../components/Button";
//import Input from "../components/Input";

//profile to see own account, logout and delete. 

function Profile() {

    const navigate = useNavigate(); //redirect user
    const [user, setUser] = useState(null); //state variables

    //fetching user data with useEffect API call
    useEffect(() => {
        async function viewProfile(){ //function 
            try{
                const res = await viewOwnProfile(); 
                console.log(res.data)//fetch user data and store
                setUser(res.data); 
            }
            catch(err){ //for error and redirect to login page
                alert("fail to logout"); 
                navigate("/login"); //bring user back to login
            }
    }
     //call function
    viewProfile();
    }, [navigate]); 

    //function to handle logout request
    async function logoutHandler() {
        await logout(); //only when user request to logout
        navigate("/login") //redirect to home
    }

   //function for deleting own account for usesr
   async function deleteOwnAccount() {
    
    // react confirm window
    const confirmed = window.confirm("Are you suere you want to delete this account?");

    if (confirmed){
    
        await deleteOwnProfile();
        navigate("/")
    } 
    else{
        if(!confirmed){
            return;
        }
    }
   }
   //check
    if (!user){
        return <p className="p-6">Loading Profile...</p>;
    }
    //catch
    return( //tailwind here
        <div className="flex min-h-screen items-center justify-center bg-gray-100"> {/* centering */}

        {/*add a white card for all the content */}
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        
        <div className="flex flex-col items-center space-y-4"> {/*adding space */}

            {/*Profile icon */}

            <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full">
                <svg className="absolute w-12 h-12 text-body-subtle -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                </svg>
            </div>
            {/*Title */}
            <h1 className="text-2xl font-bold ">My Profile</h1>

            <div className="w-full space-y-4 text-left"> 
            {/*Email */}
            <p>
                <span className="font-semibold">Email: </span> {user.user.email}
            </p>
            {/*Username*/}
            <p>
                <span className="font-semibold">Username: </span> {user.user.usernameGenerated}
            </p>

            </div>

            <Button onClick={logoutHandler}>Logout</Button>

            <button onClick={deleteOwnAccount}>
                Delete Accout
            </button>

        </div>

        
        </div>
        </div>
    );
}
export default Profile;