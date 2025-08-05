import React, { useState } from "react";
import { registeruser } from "../Apis/user.api.js";
import { withAsyncHandler } from "../utils/asyncWrapper.js";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice.js";
import { toast } from "react-hot-toast";

const RegisterForm = ({ state }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const registerHandler = withAsyncHandler(
    async (name, email, password) => {
      const res = await registeruser(name, email, password);
      return res.data;
    },
    {
      onError: (err) => {
        setErrors({ form: "Registration failed. Try again.",err});
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
  const data = await registerHandler(formData.name, formData.email, formData.password);
  dispatch(login(data.user));
  toast.success("Account created successfully!");
  navigate({ to: "/dashboard" });
} catch (err) {
  setErrors({ form: "Something went wrong.",err });
  toast.error("Registration failed. Try again.");
}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Register</h2>
        {errors.form && <p className="text-red-500 text-sm mb-4">{errors.form}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${
                errors.name ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${
                errors.email ? "border-red-500" : "focus:ring-blue-500"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 ${
                  errors.password ? "border-red-500" : "focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => state(true)}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
