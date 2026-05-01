// import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed"; 
import CreatePost from "./pages/CreatePost"; 

import PostCard from "./components/PostCard";

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
    </Routes>
    
    </BrowserRouter>

    // testing tailwind
    // <div className="min-h-screen bg-red-500 text-white flex items-center justify-center">
    //   <h1 className="text-4xl font-bold">
    //     Tailwind is working
    //   </h1>
    // </div>
  );


  // const fakePost = {
  //   _id: "123",
  //   title: "Test Post Title",
  //   authorName: "anonymous_penguin",
  //   content: "This is a test post to check if PostCard works.",
  //   tags: ["test", "react", "tailwind"],
  //   createdAt: new Date().toISOString(),
  // };

  // return (
  //   <div className="min-h-screen bg-gray-100 p-6">
  //     <div className="mx-auto max-w-md">
  //       <PostCard post={fakePost} />
  //     </div>
  //   </div>
  // );
}

export default App;