import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  // Check session on page load
  useEffect(() => {
    fetch("http://localhost:9000/api/auth/me", {
      credentials: "include", // Ensures cookies are sent with the request
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        if (data?.usernameGenerated) {
          setUser(data); // Store the user in state
        } else {
          setUser(null); // No user logged in
        }
      })
      .catch(() => setUser(null)); // If error, log out
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:9000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensure session cookie is sent with request
      });

      setUser(null); // Clear user data 
      navigate("/"); // Navigate to the home page after logout
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        EKHO
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-gray-700 font-medium items-center">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link to="/adminreport" className="hover:text-blue-600 transition">
          Admin Report
        </Link>

        {/* IF USER IS LOGGED IN */}
        {user ? (
          <>
            <Link to="/feed" className="hover:text-blue-600 transition">
              Feed
            </Link>

            <Link to="/communities" className="hover:text-blue-600 transition">
              Communities
            </Link>

            {/* Display Username */}
            <Link
                to="/profile"
                className="text-blue-600 font-semibold hover:underline"
            >
                {user.usernameGenerated || "Anonymous"}
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          /* IF NOT LOGGED IN */
          /* working */
          <>
            <Link to="/login" className="hover:text-blue-600 transition">
              Login
            </Link>

            <Link to="/register" className="hover:text-blue-600 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;