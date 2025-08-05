import React, { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice.js";
import { logoutuser } from "../Apis/user.api.js";
import { withAsyncHandler } from "../utils/asyncWrapper.js";
import { FaMoon, FaSun } from "react-icons/fa"; // optional dark mode icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const username = user?.name?.split(" ")[0] || "User";

  const logoutHandler = withAsyncHandler(async () => {
    return await logoutuser();
  }, {
    onError: (err) => console.error("Logout failed:", err)
  });

  const handleLogout = async () => {
    try {
      await logoutHandler();
      dispatch(logout());
      navigate({ to: "/" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="text-xl font-bold text-gray-800">URL Shortener</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 font-medium hover:text-blue-500 transition duration-200 underline"
              activeProps={{ className: "text-blue-500 underline" }}
            >
              Home
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-700 font-medium hover:text-blue-500 transition duration-200"
                activeProps={{ className: "text-blue-500 underline" }}
              >
                Dashboard
              </Link>
            )}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">Hi, {username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md text-sm hover:opacity-90 transition"
              >
                Sign In
              </Link>
            )}

            {/* Optional: Theme Toggle */}
            {/* <button className="text-gray-600 hover:text-yellow-500 transition">
              <FaMoon />
            </button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block text-gray-700 font-medium hover:text-blue-500 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="block text-gray-700 font-medium hover:text-blue-500 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <span className="block text-sm text-gray-600">Hi, {username}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block text-left text-red-500 w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="block text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
