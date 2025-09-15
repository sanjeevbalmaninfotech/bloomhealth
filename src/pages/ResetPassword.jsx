import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useResetPasswordMutation } from "../services/authAPI";
import { validateField, validateForm } from "../utils/validation";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const [resetPassword, { isLoading: loading, isSuccess, error }] = useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  const validatePassword = (value) => {
    let strength = 0;

    if (value.length >= 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[a-z]/.test(value)) strength += 1;
    if (/\d/.test(value)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 1;

    setPasswordStrength((strength / 5) * 100);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate individual field
    const error = validateField(name, value, formData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value, formData);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 20) return "bg-red-500";
    if (passwordStrength < 40) return "bg-orange-500";
    if (passwordStrength < 60) return "bg-yellow-500";
    if (passwordStrength < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 20) return "Very Weak";
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 60) return "Medium";
    if (passwordStrength < 80) return "Strong";
    return "Very Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    
    // Validate all fields
    const formErrors = validateForm(formData);
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    if (!token) {
      setMessage("Invalid or missing reset token");
      return;
    }

    const payload = {
      token,
      newPassword: formData.password,
    };

    try {
      await resetPassword(payload).unwrap();
    } catch (err) {
      setMessage(err.data?.message || "Failed to reset password");
    }
  };

  const passwordRequirements = [
    { key: "length", text: "At least 8 characters", met: formData.password.length >= 8 },
    { key: "uppercase", text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { key: "lowercase", text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { key: "number", text: "One number", met: /\d/.test(formData.password) },
    { key: "special", text: "One special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        {!token && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Invalid or missing reset token. Please check your email for the correct link.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-12 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
            
            {/* Password Strength Meter */}
            {formData.password && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${getPasswordStrengthColor()}`} 
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  Strength: <span className="font-medium">{getPasswordStrengthText()}</span>
                </p>
                
                {/* Password Requirements */}
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map(req => (
                    <div key={req.key} className="flex items-center">
                      {req.met ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-400 mr-2" />
                      )}
                      <span className={`text-xs ${req.met ? 'text-green-600' : 'text-gray-500'}`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-12 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}