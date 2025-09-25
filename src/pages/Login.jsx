import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRequestOtpMutation, useVerifyOtpMutation } from "../services/authAPI";
import { showToast } from "@/utils/toast"; // your react-toastify wrapper
import { Logo } from "../components/logo";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from || '/';

  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = request OTP, 2 = verify OTP
  const [loading, setLoading] = useState(false);

  const [requestOtp] = useRequestOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return showToast.error('Please enter phone number');
    setLoading(true);
    try {
      await requestOtp({ countryCode, phoneNumber }).unwrap();
      setStep(2);
    } catch (err) {
      // errors handled in mutation
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return showToast.error('Please enter OTP');
    setLoading(true);
    try {
      const res = await verifyOtp({ countryCode, phoneNumber, otp }).unwrap();
      // sessionStorage token is set in authAPI on success, navigate
      navigate(from, { replace: true });
    } catch (err) {
      // handled in mutation
    } finally {
      setLoading(false);
    }
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
          Login with your mobile number
        </p>

        {step === 1 && (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            <div className='flex items-center gap-2'>
              <div className='w-28'>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className='w-full pl-2 pr-2 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition'
                >
                  <option value='+91'>+91 (IN)</option>
                  <option value='+1'>+1 (US)</option>
                  <option value='+44'>+44 (UK)</option>
                </select>
              </div>
              <div className='flex-1 relative'>
                <input
                  type='tel'
                  placeholder='Phone Number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='w-full pl-2 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition'
                  required
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full py-2.5 bg-[#157fc1] text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition transform hover:scale-[1.02]'
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className='space-y-5'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Enter OTP'
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className='w-full pl-2 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition'
                required
              />
            </div>
            <button
              type='submit'
              disabled={loading}
              className='w-full py-2.5 bg-[#157fc1] text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md transition transform hover:scale-[1.02]'
            >
              {loading ? 'Verifying...' : 'Verify OTP & Login'}
            </button>
          </form>
        )}
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
