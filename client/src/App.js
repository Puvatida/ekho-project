// import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="register" element={<Register/>}></Route>
      <Route path="login" element={<Login/>}></Route>
    </Routes>
    
    </BrowserRouter>

    // testing tailwind
    // <div className="min-h-screen bg-red-500 text-white flex items-center justify-center">
    //   <h1 className="text-4xl font-bold">
    //     Tailwind is working
    //   </h1>
    // </div>
  );
}

export default App;