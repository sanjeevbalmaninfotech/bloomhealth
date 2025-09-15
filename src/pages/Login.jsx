import { useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/authAPI";
import { showToast } from "@/utils/toast"; // your react-toastify wrapper
import { validateField, validateForm } from "../utils/validation";
import { Logo } from "../components/logo";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || '/';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "" });

  const [login, { isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate(from, { replace: true });
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fieldValues = { email, password };
    const formErrors = validateForm(fieldValues);
  
    setErrors(formErrors);
  
    if (Object.keys(formErrors).length > 0) {
      showToast.error("Please fix the errors in the form");
      return;
    }
  
    login(fieldValues);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <Logo className="h-12 w-auto" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Please login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-4">{errors.email}</p>
            )}
          </div>

          {/* Password with Eye toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              className={`w-full pl-2 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (<p className="text-red-500 text-sm">{errors.password}</p>)}
          {/* Remember me + Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-[#157fc1]" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-[#157fc1] text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>
        {/* Extra links */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#157fc1] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
