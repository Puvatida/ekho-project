import { data } from "react-router-dom";
import API from "./api"; // import axios instance

//for auth.js
// w/out full fetch using axios 

//register function
export const register = (data) => API.post("/auth/register", data); //post request send

//login function
export const login = (data) => API.post("/auth/login", data);

//logout function
export const logout = () => API.get("/auth/logout"); //no data here