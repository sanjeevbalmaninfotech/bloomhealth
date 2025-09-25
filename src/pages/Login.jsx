import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRequestOtpMutation, useVerifyOtpMutation } from "../services/authAPI";
import { showToast } from "@/utils/toast";
import { Logo } from "../components/logo";
import { Loader, ArrowLeft, Phone, Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || '/';

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = request OTP, 2 = verify OTP
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [resendCooldown, setResendCooldown] = useState(0);

  const [requestOtp] = useRequestOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  // Cooldown timer for resend OTP
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  // Validation functions
  const validatePhoneNumber = (phone) => {
    if (!phone) return 'Phone number is required';
    if (!/^\d+$/.test(phone)) return 'Phone number can only contain digits';
    if (phone.length !== 10) return 'Phone number must be exactly 10 digits';
    if (phone.startsWith('0')) return 'Phone number cannot start with 0';
    return '';
  };

  const validateOtp = (otpValue) => {
    if (!otpValue) return 'OTP is required';
    if (!/^\d+$/.test(otpValue)) return 'OTP can only contain digits';
    if (otpValue.length !== 6) return 'OTP must be exactly 6 digits';
    return '';
  };

  // Handle phone number input with validation
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limitedValue = digitsOnly.slice(0, 10);
    
    setPhoneNumber(limitedValue);

    // Validate if field has been touched
    if (touched.phoneNumber) {
      const error = validatePhoneNumber(limitedValue);
      setErrors(prev => ({ ...prev, phoneNumber: error }));
    }
  };

  // Handle OTP input with validation
  const handleOtpChange = (e) => {
    const value = e.target.value;
    
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '');
    
    // Limit to 6 digits
    const limitedValue = digitsOnly.slice(0, 6);
    
    setOtp(limitedValue);

    // Validate if field has been touched
    if (touched.otp) {
      const error = validateOtp(limitedValue);
      setErrors(prev => ({ ...prev, otp: error }));
    }
  };

  // Handle key press to prevent 'e', '+', '-', '.'
  const handleKeyPress = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Handle field blur for validation
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (field === 'phoneNumber') {
      const error = validatePhoneNumber(phoneNumber);
      setErrors(prev => ({ ...prev, phoneNumber: error }));
    } else if (field === 'otp') {
      const error = validateOtp(otp);
      setErrors(prev => ({ ...prev, otp: error }));
    }
  };

  // Handle requesting OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();

    // Mark field as touched and validate
    setTouched({ phoneNumber: true });
    const phoneError = validatePhoneNumber(phoneNumber);
    setErrors({ phoneNumber: phoneError });

    if (phoneError) {
      showToast.error('Please fix the errors before continuing');
      return;
    }
      try { 
  setLoading(true);
    
    
  
      // there call the api
      //  await requestOtp({ countryCode, phoneNumber }).unwrap();
    
      setTimeout(()=>{
    
        setStep(2);
      setResendCooldown(30); // 30 second cooldown
    },2000)
      showToast.success('OTP sent successfully to your mobile number');
    } catch (err) {
      // Error handling is done in the mutation, but we can add additional handling here
      console.error('Request OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    // Mark field as touched and validate
    setTouched(prev => ({ ...prev, otp: true }));
    const otpError = validateOtp(otp);
    setErrors(prev => ({ ...prev, otp: otpError }));

    if (otpError) {
      showToast.error('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      const res = await verifyOtp({ countryCode, phoneNumber, otp }).unwrap();
      showToast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      // Error handling is done in the mutation
      console.error('Verify OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    
    setLoading(true);
    try {
      await requestOtp({ countryCode, phoneNumber }).unwrap();
      setResendCooldown(30);
      showToast.success('OTP resent successfully');
    } catch (err) {
      console.error('Resend OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Go back to phone number step
  const handleBackToPhone = () => {
    setStep(1);
    setOtp('');
    setErrors({});
    setTouched({});
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
        <div className="flex justify-center mb-6">
          <Logo className="h-12 w-auto" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {step === 1 ? 'Welcome Back' : 'Verify Your Number'}
          </h2>
          <p className="text-gray-500 text-sm">
            {step === 1 
              ? 'Login with your mobile number' 
              : `We've sent a 6-digit code to ${countryCode} ${phoneNumber}`
            }
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            {/* Phone Number Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                Mobile Number
              </label>
              <div className='flex items-center gap-2'>
                <div className='w-28'>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={loading}
                    className={`w-full pl-2 pr-2 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                      loading ? 'bg-gray-50 cursor-not-allowed' : 'border-gray-300 focus:ring-blue-500'
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
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phoneNumber')}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                      errors.phoneNumber 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } ${loading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    required
                    maxLength={10}
                  />
                </div>
              </div>
              {errors.phoneNumber && (
                <p className='text-red-500 text-xs mt-1'>{errors.phoneNumber}</p>
              )}
              <p className="text-xs text-gray-500">
                Enter your 10-digit mobile number without country code
              </p>
            </div>

            <button
              type='submit'
              disabled={loading || !!errors.phoneNumber}
              className={`w-full py-2.5 font-semibold rounded-lg shadow-md transition transform flex items-center justify-center ${
                loading || !!errors.phoneNumber
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-[#157fc1] text-white hover:bg-blue-700 hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <>
                  <Loader className='animate-spin h-5 w-5 mr-2' />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <>
            {/* Back button */}
            <button
              onClick={handleBackToPhone}
              disabled={loading}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Change number
            </button>

            <form onSubmit={handleVerifyOtp} className='space-y-5'>
              {/* OTP Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Enter OTP
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Enter 6-digit OTP'
                    value={otp}
                    onChange={handleOtpChange}
                    onBlur={() => handleBlur('otp')}
                    onKeyPress={handleKeyPress}
                    disabled={loading}
                    className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition text-center text-lg tracking-widest ${
                      errors.otp 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-blue-500'
                    } ${loading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    required
                    maxLength={6}
                    autoFocus
                  />
                </div>
                {errors.otp && (
                  <p className='text-red-500 text-xs mt-1'>{errors.otp}</p>
                )}
              </div>

              <button
                type='submit'
                disabled={loading || !!errors.otp}
                className={`w-full py-2.5 font-semibold rounded-lg shadow-md transition transform flex items-center justify-center ${
                  loading || !!errors.otp
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-[#157fc1] text-white hover:bg-blue-700 hover:scale-[1.02]'
                }`}
              >
                {loading ? (
                  <>
                    <Loader className='animate-spin h-5 w-5 mr-2' />
                    Verifying...
                  </>
                ) : (
                  'Verify OTP & Login'
                )}
              </button>
            </form>

            {/* Resend OTP */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendOtp}
                disabled={loading || resendCooldown > 0}
                className={`text-sm font-medium transition ${
                  loading || resendCooldown > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700 hover:underline'
                }`}
              >
                {resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s` 
                  : 'Resend OTP'
                }
              </button>
            </div>
          </>
        )}

        {/* Registration link */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#157fc1] font-medium hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;