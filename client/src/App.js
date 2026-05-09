// import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed"; 
import CreatePost from "./pages/CreatePost"; 
import AdminReports from "./pages/adminreport";
import PostCard from "./components/PostCard";
import CreateComment from "./pages/CreateComment";

function App() {


  return (
    <BrowserRouter>
      <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="register" element={<Register/>}></Route>
      <Route path="login" element={<Login/>}></Route>
      <Route path="profile" element={<Profile/>}></Route>
      <Route path="/feed" element={<Feed />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/adminreport" element={<AdminReports />} />
      <Route path="/post/:postId/comments" element={<CreateComment />} /> 
    </Routes>
    
    </BrowserRouter>

  );


}

export default App;