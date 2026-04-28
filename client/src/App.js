// import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Profile from "./pages/Profile";

function App() {


  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register/>}></Route>
      <Route path="login" element={<Login/>}></Route>
      <Route path="profile" element={<Profile/>}></Route>
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