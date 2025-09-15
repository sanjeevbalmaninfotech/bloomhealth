import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { EyeOff, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/authAPI';
import { validateField, validateForm } from '../utils/validation';
import { toast } from 'react-toastify';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();
  const [Register, { isSuccess }] = useRegisterMutation();

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

    if (name.includes('address.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, { ...formData, [name]: value }),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const flatData = {
      ...formData,
      'address.street': formData.address.street,
      'address.city': formData.address.city,
      'address.state': formData.address.state,
      'address.zip': formData.address.zip,
      'address.country': formData.address.country,
    };

    const formErrors = validateForm(flatData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error('Please fix the errors in the form');
      return;
    }

    const payload = {
      ...formData,
      address: { ...formData.address },
    };

    Register(payload);
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

  const passwordRequirements = [
    { key: "length", text: "At least 8 characters", met: formData.password.length >= 8 },
    { key: "uppercase", text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { key: "lowercase", text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { key: "number", text: "One number", met: /\d/.test(formData.password) },
    { key: "special", text: "One special character", met: /[!@#$%^&*(),.?\":{}|<>]/.test(formData.password) },
  ];

  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'>
      <div className='w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 overflow-y-auto max-h-screen'>
        <div className='flex justify-center mb-6'>
          <Logo className='h-12 w-auto' />
        </div>

        <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>Create Account</h2>
        <p className='text-center text-gray-500 text-sm mb-6'>
          Please fill in your details to register
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* First & Last Name */}
          <div className='flex gap-4'>
            <div className='flex-1 relative'>
              <input
                type='text'
                name='firstName'
                placeholder='First Name'
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {errors.firstName && <p className='text-red-500 text-xs mt-4'>{"first name is required"}</p>}
            </div>
            <div className='flex-1 relative'>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {errors.lastName && <p className='text-red-500 text-xs mt-4'>{"last name is required"}</p>}
            </div>
          </div>

          {/* Username */}
          <div className='relative'>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {errors.username && <p className='text-red-500 text-xs mt-4'>{errors.username}</p>}
          </div>

          {/* Email */}
          <div className='relative'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {errors.email && <p className='text-red-500 text-xs mt-4'>{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-2 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
              >
                {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
              </button>
            </div>
            {errors.password && <p className='text-red-500 text-xs mt-4'>{errors.password}</p>}

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
          <div className='relative'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-2 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
            >
              {showConfirmPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
            </button>
          </div>
          {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword}</p>}

          {/* Gender */}
          <div className='flex gap-4'>
            <div className='flex-1 relative '>
              <select
                name='gender'
                value={formData.gender}
                onChange={handleChange}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              >
                <option value=''>Select Gender</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
              {errors.gender && <p className='text-red-500 text-xs mt-4'>{errors.gender}</p>}
            </div>
          </div>

          {/* Phone */}
          <div className='relative'>
            <input
              type='tel'
              name='phoneNumber'
              placeholder='Phone Number'
              value={formData.phoneNumber}
              onChange={handleChange}
              className={`w-full pl-2 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.phoneNumber && <p className='text-red-500 text-xs mt-4'>{errors.phoneNumber}</p>}
          </div>

          {/* Address */}
          <h4 className='text-gray-700 font-medium mt-4'>Address</h4>
          <input
            type='text'
            name='address.street'
            placeholder='Street'
            value={formData.address.street}
            onChange={handleChange}
            className='w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition mt-1'
          />
          <div className='flex gap-4 mt-1'>
            <input
              type='text'
              name='address.city'
              placeholder='City'
              value={formData.address.city}
              onChange={handleChange}
              className='flex-1 pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            />
            <input
              type='text'
              name='address.state'
              placeholder='State'
              value={formData.address.state}
              onChange={handleChange}
              className='flex-1 pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            />
          </div>
          <div className='flex gap-4 mt-1'>
            <input
              type='text'
              name='address.zip'
              placeholder='ZIP'
              value={formData.address.zip}
              onChange={handleChange}
              className='flex-1 pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            />
            <input
              type='text'
              name='address.country'
              placeholder='Country'
              value={formData.address.country}
              onChange={handleChange}
              className='flex-1 pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            />
          </div>

          <button
            type='submit'
            className='w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition transform hover:scale-[1.02] mt-4'
          >
            Register
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 font-medium hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
