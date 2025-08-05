import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slice/authSlice.js";
import { logoutuser } from "../Apis/user.api";
import { withAsyncHandler } from "../utils/asyncWrapper";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = withAsyncHandler(
    async () => {
      await logoutuser();
    },
    {
      onFinally: () => {
        dispatch(logout());
        navigate({ to: "/" });
      },
    }
  );

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">🔗 URL Shortner</span>
          <span className="text-sm text-gray-400 hidden sm:inline mt-1">Your personal URL toolbox</span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-500 font-medium"
            activeProps={{ className: "text-blue-600 underline" }}
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-blue-500 font-medium"
              activeProps={{ className: "text-blue-600 underline" }}
            >
              Dashboard
            </Link>
          )}

          {isAuthenticated ? (
            <button
              onClick={logoutHandler}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
