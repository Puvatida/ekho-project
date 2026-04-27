import { data } from "react-router-dom";
import API from "./api"; // import axios instance

//get own profile function
export const viewOwnProfile = (data) => API.get("/users/me", data); //no data here

//delete user function
export const deleteOwnProfile = () => API.delete("/users/me"); //no data here