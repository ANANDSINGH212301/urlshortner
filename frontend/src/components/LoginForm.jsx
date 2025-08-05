import React, { useState } from "react";
import { loginuser } from "../Apis/user.api.js";
import { withAsyncHandler } from "../utils/asyncWrapper.js";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-hot-toast";

const LoginForm = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = withAsyncHandler(
    async (email, password) => {
      const res = await loginuser(email, password);
      return res.data;
    },
    {
      onError: (err) => {
        setError("Login failed. Please check your credentials.", err);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginHandler(email, password);
      dispatch(login(data.user));
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError("Invalid credentials",err);
      toast.error("Login failed. Check your email or password.");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => state(false)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
