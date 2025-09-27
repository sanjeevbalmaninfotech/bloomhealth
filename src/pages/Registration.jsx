import { useEffect, useState } from 'react';
import { EyeOff, Eye, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { post, handle } from '../services/apiClient';
import { validateField, validateForm } from '../utils/validation';
import { toast } from 'react-toastify';
import { Logo } from '../components/logo';

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
    countryCode: '+91',
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
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    validatePassword(formData.password);
  }, [formData.password]);

  // Enhanced validation functions
  const validatePassword = (value) => {
    let strength = 0;
    if (value.length >= 8) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[a-z]/.test(value)) strength += 1;
    if (/\d/.test(value)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength += 1;
    setPasswordStrength((strength / 5) * 100);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers and underscores';
    return '';
  };

  const validatePasswordField = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
    if (!/\d/.test(password)) return 'Password must contain at least one number';
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain at least one special character';
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'Phone number is required';
    if (!/^\d{10}$/.test(phoneNumber)) return 'Please enter a valid 10-digit phone number';
    return '';
  };

  const validateName = (name, fieldName) => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (!/^[a-zA-Z\s]+$/.test(name)) return `${fieldName} can only contain letters and spaces`;
    return '';
  };

  const validateRequired = (value, fieldName) => {
    if (!value || value.toString().trim() === '') return `${fieldName} is required`;
    return '';
  };

  // Real-time validation
  const validateFieldRealTime = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        error = validateName(value, 'First name');
        break;
      case 'lastName':
        error = validateName(value, 'Last name');
        break;
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePasswordField(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value, formData.password);
        break;
      case 'gender':
        error = validateRequired(value, 'Gender');
        break;
      case 'phoneNumber':
        error = validatePhoneNumber(value);
        break;
      case 'address.street':
        error = validateRequired(value, 'Street address');
        break;
      case 'address.city':
        error = validateRequired(value, 'City');
        break;
      case 'address.state':
        error = validateRequired(value, 'State');
        break;
      case 'address.zip':
        error = validateRequired(value, 'ZIP code');
        break;
      case 'address.country':
        error = validateRequired(value, 'Country');
        break;
      default:
        break;
    }
    
    return error;
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
    }

    // Real-time validation
    if (touched[name]) {
      const error = validateFieldRealTime(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }

    // Special case for confirm password when password changes
    if (name === 'password' && touched.confirmPassword && formData.confirmPassword) {
      const confirmError = validateConfirmPassword(formData.confirmPassword, value);
      setErrors((prev) => ({
        ...prev,
        confirmPassword: confirmError,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    const error = validateFieldRealTime(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Comprehensive form validation
  const validateAllFields = () => {
    const newErrors = {};

    // Validate all fields
    newErrors.firstName = validateName(formData.firstName, 'First name');
    newErrors.lastName = validateName(formData.lastName, 'Last name');
    newErrors.username = validateUsername(formData.username);
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePasswordField(formData.password);
    newErrors.confirmPassword = validateConfirmPassword(formData.confirmPassword, formData.password);
    newErrors.gender = validateRequired(formData.gender, 'Gender');
    newErrors.phoneNumber = validatePhoneNumber(formData.phoneNumber);
    newErrors['address.street'] = validateRequired(formData.address.street, 'Street address');
    newErrors['address.city'] = validateRequired(formData.address.city, 'City');
    newErrors['address.state'] = validateRequired(formData.address.state, 'State');
    newErrors['address.zip'] = validateRequired(formData.address.zip, 'ZIP code');
    newErrors['address.country'] = validateRequired(formData.address.country, 'Country');

    // Filter out empty errors
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== '')
    );

    return filteredErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allFields = [
      'firstName', 'lastName', 'username', 'email', 'password', 'confirmPassword',
      'gender', 'phoneNumber', 'address.street', 'address.city', 'address.state',
      'address.zip', 'address.country'
    ];
    
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);

    // Validate all fields
    const formErrors = validateAllFields();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error('Please fix all errors before submitting');
      // Focus on first error field
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.focus();
      }
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        address: { ...formData.address },
        phone: `${formData.countryCode}${formData.phoneNumber}`,
      };

      const registerUrl = 'http://localhost:8088/Patient/post_patients_register';
      const resp = await handle(post(registerUrl, payload));
      
      if (!resp.error) {
        toast.success('Registration successful! Please login to continue.');
        navigate('/login');
      } else {
        toast.error(resp.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              />
              {errors.firstName && <p className='text-red-500 text-xs mt-1'>{errors.firstName}</p>}
            </div>
            <div className='flex-1 relative'>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              />
              {errors.lastName && <p className='text-red-500 text-xs mt-1'>{errors.lastName}</p>}
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
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required
            />
            {errors.username && <p className='text-red-500 text-xs mt-1'>{errors.username}</p>}
          </div>

          {/* Email */}
          <div className='relative'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required
            />
            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
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
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed'
              >
                {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
              </button>
            </div>
            {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}

            {formData.password && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-gray-600">
                  Strength: <span className="font-medium">{getPasswordStrengthText()}</span>
                </p>

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
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full pl-3 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed'
            >
              {showConfirmPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
            </button>
          </div>
          {errors.confirmPassword && <p className='text-red-500 text-xs mt-1'>{errors.confirmPassword}</p>}

          {/* Gender */}
          <div className='relative'>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
            {errors.gender && <p className='text-red-500 text-xs mt-1'>{errors.gender}</p>}
          </div>

          {/* Phone */}
          <div className='flex items-center gap-2'>
            <div className='w-28'>
              <select
                name='countryCode'
                value={formData.countryCode}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full pl-2 pr-2 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  isLoading ? 'bg-gray-50 cursor-not-allowed' : 'border-gray-300 focus:ring-blue-500'
                }`}
              >
                <option value='+91'>+91 (IN)</option>
                <option value='+1'>+1 (US)</option>
                <option value='+44'>+44 (UK)</option>
                <option value='+61'>+61 (AU)</option>
                <option value='+971'>+971 (AE)</option>
              </select>
            </div>
            <div className='flex-1 relative'>
              <input
                type='tel'
                name='phoneNumber'
                placeholder='Phone Number'
                value={formData.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
              {errors.phoneNumber && <p className='text-red-500 text-xs mt-1'>{errors.phoneNumber}</p>}
            </div>
          </div>

          {/* Address */}
          <h4 className='text-gray-700 font-medium mt-6 mb-2'>Address</h4>
          <div className='space-y-3'>
            <div>
              <input
                type='text'
                name='address.street'
                placeholder='Street Address'
                value={formData.address.street}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors['address.street'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              />
              {errors['address.street'] && <p className='text-red-500 text-xs mt-1'>{errors['address.street']}</p>}
            </div>
            
            <div className='flex gap-4'>
              <div className='flex-1'>
                <input
                  type='text'
                  name='address.city'
                  placeholder='City'
                  value={formData.address.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                    errors['address.city'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
                {errors['address.city'] && <p className='text-red-500 text-xs mt-1'>{errors['address.city']}</p>}
              </div>
              <div className='flex-1'>
                <input
                  type='text'
                  name='address.state'
                  placeholder='State'
                  value={formData.address.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                    errors['address.state'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
                {errors['address.state'] && <p className='text-red-500 text-xs mt-1'>{errors['address.state']}</p>}
              </div>
            </div>
            
            <div className='flex gap-4'>
              <div className='flex-1'>
                <input
                  type='text'
                  name='address.zip'
                  placeholder='ZIP Code'
                  value={formData.address.zip}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                    errors['address.zip'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
                {errors['address.zip'] && <p className='text-red-500 text-xs mt-1'>{errors['address.zip']}</p>}
              </div>
              <div className='flex-1'>
                <input
                  type='text'
                  name='address.country'
                  placeholder='Country'
                  value={formData.address.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                    errors['address.country'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
                {errors['address.country'] && <p className='text-red-500 text-xs mt-1'>{errors['address.country']}</p>}
              </div>
            </div>
          </div>

          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-2.5 font-semibold rounded-lg shadow-md transition transform mt-6 flex items-center justify-center ${
              isLoading
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader className='animate-spin h-5 w-5 mr-2' />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 font-medium hover:underline'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;