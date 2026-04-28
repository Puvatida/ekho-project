import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      
      {/* Logo / Brand */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        EKHO
      </Link>

      {/* Links */}
      <div className="flex gap-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        <Link to="/login" className="hover:text-blue-600 transition">
          Login
        </Link>

        <Link to="/register" className="hover:text-blue-600 transition">
          Register
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;