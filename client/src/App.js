import React, { useState, useEffect } from "react";

function App() {
const[apiResponse, setApiResponse] = useState("");
// Function to call the API
const callAPI = () =>{
  fetch
  ("http://localhost:9000/testAPI")
  .then((res) => res
  .text())
  .then((res) => setApiResponse(res));
};

// Runs once when the component loads
useEffect(() =>{
callAPI();
}, []);

// return ( <div className="App">
//   <h1>Express + React Test</h1><p>
//   {apiResponse}</p></div> );
// testing tailwind
  return (
    <div className="min-h-screen bg-red-500 text-white flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Tailwind is working
      </h1>
    </div>
  );
}

export default App;