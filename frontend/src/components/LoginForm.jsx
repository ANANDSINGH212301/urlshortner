import React, { useState } from "react";
import { loginuser } from "../Apis/user.api.js";
import { withAsyncHandler } from "../utils/asyncWrapper";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";

// import { useSelector } from "react-redux"; 

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const auth = useSelector((state) => {
  //   return state.auth;
  // });
  // console.log(auth)
  const loginUserHandler = withAsyncHandler(
    async (email, password) => {
      const res = await loginuser(email, password);
      console.log(res.data.user);
      return res.data;
    },
    {
      onError: (err) => {
        setError(err.message || "Login failed. Please check your credentials.");
      },
      onFinally: () => {
        setLoading(false);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUserHandler(email, password);
      setLoading(false);
      dispatch(login(data.user));
      navigate({ to: "/dashboard" });
    } catch (error) {
      setError("Email and password are required :" + error);
    }
    if (!email || !password) {
      return;
    }
  };

  return (
    <div className="h-[90vh] bg-gray-100 flex justify-center  items-center">
      <div className="bg-white p-8 rounded-lg  w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <button
                type="button"
                className="text-sm text-blue-500 hover:text-blue-700"
                onClick={() => {
                  /* Add forgot password functionality */
                }}
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 font-medium"
              onClick={() => state(false)}
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
