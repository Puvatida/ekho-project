
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigate = (path) => {
    setOpen(false); // close menu immediately
    navigate(path); // navigate to the page
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-6 right-6 flex flex-col items-end space-y-4 z-50"
    >
      {/* Mini buttons */}
      {open && (
        <div className="flex flex-col space-y-2 mb-2">
          <button
            onClick={() => handleNavigate("/post")}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
          >
            New Post
          </button>
          <button
            onClick={() => handleNavigate("/create")}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition"
          >
            New Community
          </button>
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-blue-700 transition"
      >
        +
      </button>
    </div>
  );
};

export default Footer;

