import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useLookupUserMutation,
} from '../services/authAPI';
import { showToast } from '@/utils/toast';
import { Logo } from '../components/logo';
import { Loader, ArrowLeft, Phone, Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || '/';

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [originalPhone, setOriginalPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [userLookupError, setUserLookupError] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(0); // 0 = enter patient id, 1 = request OTP / confirm phone, 2 = verify OTP
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [resendCooldown, setResendCooldown] = useState(0);

  const [requestOtp] = useRequestOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [lookupUser] = useLookupUserMutation();

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

  // Helper to mask phone for display: show last 4 digits only
  const maskPhone = (phone) => {
    if (!phone) return '';
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length <= 4) return digitsOnly;
    const last4 = digitsOnly.slice(-4);
    return `**** **** ${last4}`;
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
      setErrors((prev) => ({ ...prev, phoneNumber: error }));
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
      setErrors((prev) => ({ ...prev, otp: error }));
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
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === 'phoneNumber') {
      const error = validatePhoneNumber(phoneNumber);
      setErrors((prev) => ({ ...prev, phoneNumber: error }));
    } else if (field === 'otp') {
      const error = validateOtp(otp);
      setErrors((prev) => ({ ...prev, otp: error }));
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
      
      // Call sendOtp API with patientId, mobileNumber, and countryCode
      await requestOtp({ 
        patientId: userId,
        mobileNumber: phoneNumber,
        countryCode: countryCode
      }).unwrap();
      
      showToast.success('OTP sent successfully');
      // on success, move to OTP entry
      setStep(2);
      setResendCooldown(30);
    } catch (err) {
      console.error('Request OTP error:', err);
      showToast.error(err?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Handle patient id lookup
  const handleLookupUser = async (e) => {
    e.preventDefault();
    setUserLookupError('');

    if (!userId || userId.trim().length < 3) {
      setUserLookupError('Please enter a valid patient id (at least 3 characters)');
      return;
    }

    setLoading(true);
    try {
      // Call /loginId API to lookup patient
      const res = await lookupUser({ patientId: userId }).unwrap();

      // Expecting response with phone number details
      const returnedPhone = res?.responseObject?.masked || res?.mobileNumber || '';
      const returnedCountry = res?.responseObject?.patientCountryCode || res?.phoneCountryCode || '+91';

      if (returnedPhone) {
        setCountryCode(returnedCountry);
        // store original phone received from backend
        setOriginalPhone(returnedPhone);
        // populate the editable input with the returned full phone
        setPhoneNumber(returnedPhone);
        setStep(1);
        setResendCooldown(0);
      } else {
        setUserLookupError('Patient not found or phone number unavailable');
      }
    } catch (err) {
      console.error('Lookup patient error:', err);
      setUserLookupError(err?.data?.message || 'Failed to lookup patient');
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    // Mark field as touched and validate
    setTouched((prev) => ({ ...prev, otp: true }));
    const otpError = validateOtp(otp);
    setErrors((prev) => ({ ...prev, otp: otpError }));

    if (otpError) {
      showToast.error('Please enter a valid OTP');
      return;
    }

    setLoading(true);
    try {
      // Call verifyOtp API with patientId, otp, phoneCountryCode, and phoneNumber
      const res = await verifyOtp({ 
        patientId: userId,
        otp: otp,
        phoneCountryCode: countryCode,
        phoneNumber: phoneNumber
      }).unwrap();
      
      showToast.success('Login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Verify OTP error:', err);
      showToast.error(err?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setLoading(true);
    try {
      // Call sendOtp API again to resend
      await requestOtp({ 
        patientId: userId,
        mobileNumber: phoneNumber,
        countryCode: countryCode
      }).unwrap();
      
      setResendCooldown(30);
      showToast.success('OTP resent successfully');
    } catch (err) {
      console.error('Resend OTP error:', err);
      showToast.error(err?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  // Go back to enter patient id
  const handleChangeUserId = () => {
    setStep(0);
    setUserId('');
    setPhoneNumber('');
    setOriginalPhone('');
    setErrors({});
    setTouched({});
    setUserLookupError('');
  };

  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100'>
      <div className='w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-100'>
        <div className='flex justify-center mb-6'>
          <Logo className='h-12 w-auto' />
        </div>

        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>
            {step === 0 ? 'Enter your Patient ID' : step === 1 ? 'Welcome Back' : 'Verify Your Number'}
          </h2>
          <p className='text-gray-500 text-sm'>
            {step === 0 && 'Please enter your patient id to continue'}
            {step === 1 && 'Login with your mobile number'}
            {step === 2 && `We've sent a 6-digit code to ${countryCode} ${maskPhone(phoneNumber)}`}
          </p>
        </div>

        {step === 0 && (
          <form onSubmit={handleLookupUser} className='space-y-5'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Patient ID</label>
              <input
                type='text'
                placeholder='Enter your patient id'
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={loading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  userLookupError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                } ${loading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              />
              {userLookupError && <p className='text-red-500 text-xs mt-1'>{userLookupError}</p>}
            </div>

            <button
              type='submit'
              disabled={loading}
              className={`w-full py-2.5 font-semibold rounded-lg shadow-md transition transform flex items-center justify-center ${
                loading
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-[#157fc1] text-white hover:bg-blue-700 hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <>
                  <Loader className='animate-spin h-5 w-5 mr-2' />
                  Looking up...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        )}

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className='space-y-5'>
            {/* Phone Number Display (masked) */}
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center'>
                <Phone className='h-4 w-4 mr-2' />
                Mobile Number
              </label>
              <div className='space-y-2'>
                {/* Masked phone display - full width */}
                <div
                  className={`w-full px-3 py-2.5 border rounded-lg bg-gray-50 text-center text-lg tracking-widest border-gray-300`}
                >
                  {originalPhone ? maskPhone(originalPhone) : maskPhone(phoneNumber)}
                </div>

                {/* Country code + input field */}
                <div className='flex items-center gap-2'>
                  <div className='w-28'>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      disabled={loading}
                      className={`w-full pl-2 pr-2 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                        loading
                          ? 'bg-gray-50 cursor-not-allowed'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                    >
                      <option value='+91'>+91 (IN)</option>
                      <option value='+1'>+1 (US)</option>
                      <option value='+44'>+44 (UK)</option>
                      <option value='+61'>+61 (AU)</option>
                      <option value='+971'>+971 (AE)</option>
                    </select>
                  </div>
                  <div className='flex-1'>
                    <input
                      type='tel'
                      placeholder='Confirm / edit phone number'
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      onBlur={() => handleBlur('phoneNumber')}
                      onKeyPress={handleKeyPress}
                      disabled={loading}
                      className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                        errors.phoneNumber
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500'
                      } ${loading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                      required
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>

              <p className='text-xs text-gray-500'>
                We will send the OTP to the number you confirm above.
              </p>

              {errors.phoneNumber && (
                <p className='text-red-500 text-xs mt-1'>{errors.phoneNumber}</p>
              )}

              <div className='flex justify-between items-center pt-2'>
                <button
                  type='button'
                  onClick={handleChangeUserId}
                  disabled={loading}
                  className={`text-sm transition ${
                    loading
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:underline hover:text-blue-800'
                  }`}
                >
                  Change patient id
                </button>
                <button
                  type='submit'
                  disabled={loading}
                  className={`flex items-center py-2 px-4 font-semibold rounded-lg shadow-md transition transform ${
                    loading
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-[#157fc1] text-white hover:bg-blue-700 hover:scale-105'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className='animate-spin h-5 w-5 mr-2' />
                      Sending...
                    </>
                  ) : (
                    'Send OTP'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <>
            <form onSubmit={handleVerifyOtp} className='space-y-5'>
              {/* OTP Input */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-700 flex items-center'>
                  <Shield className='h-4 w-4 mr-2' />
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
                {errors.otp && <p className='text-red-500 text-xs mt-1'>{errors.otp}</p>}
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
            <div className='text-center mt-4'>
              <p className='text-sm text-gray-500 mb-2'>Didn't receive the code?</p>
              <button
                onClick={handleResendOtp}
                disabled={loading || resendCooldown > 0}
                className={`text-sm font-medium transition ${
                  loading || resendCooldown > 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700 hover:underline'
                }`}
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
              </button>
            </div>
          </>
        )}

        {/* Registration link */}
        <div className='mt-6 pt-6 border-t border-gray-100'>
          <p className='text-center text-sm text-gray-500'>
            Don't have an account?{' '}
            <Link to='/register' className='text-[#157fc1] font-medium hover:underline'>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;