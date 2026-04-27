import axios from "axios"; //send request to backend
const API = axios.create({
  baseURL: "http://localhost:9000/api",
  withCredentials: true, //for cookies and sessions
});
//export to be use in other files
export default API;