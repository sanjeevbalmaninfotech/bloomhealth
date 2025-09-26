import React, { useState, useEffect, useRef } from 'react';
import { Eye, Check } from 'lucide-react';
import { colorClassMap, pdfSections } from '../constants/terms';
import SuccessTermsPopup from '../components/ui/terms-dialog';
import { validateTokenTime } from '../hooks/validToken';
import axios from 'axios';
import { env } from '../config/env.config';
import { endpoints } from '../constants/endpoints';

const TermsAndConditions = () => {
  const [token, setToken] = useState(null);
  const [checkboxes, setCheckboxes] = useState({
    termsOfUse: false,
    privacyPolicy: false,
    marketingPolicy: false,
    shareWithGP: false,
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const redirectTimeoutRef = useRef(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validToken = async () => {
    try {
      const match = window.location.pathname.match(/^\/consentDetails\/([^/]+)\/?$/);
      console.log('Extracted token from URL:', match ? match[1] : 'No token found');
      if (match && match[1]) {
        const token = match[1];

        const result = await validateTokenTime(token);

        if (result.valid) {
          setToken(token);
        } else if (result.expired) {
          console.log('❌ Token is expired');
        } else {
          console.log('❌ Token is invalid');
        }
      }
    } catch (error) {
      console.error('Invalid or expired token:', error);
    }
  };

  useEffect(() => {
    validToken();
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes((prev) => ({
      ...prev,
      [checkboxName]: !prev[checkboxName],
    }));
  };

  useEffect(() => {

    if(!token) return;  
    const handleBeforeUnload = (e) => {
      // Only block if terms not formally accepted via button
      if (!termsAccepted) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [termsAccepted]);

  const allCheckboxesChecked =
    checkboxes.termsOfUse && checkboxes.privacyPolicy && checkboxes.shareWithGP;

  const handleSubmit = async () => {
    if (!allCheckboxesChecked) return;

   
    try {
        setLoading(true);
    const response = await axios.post(
  `https://bloom-health-qa-api-audtb4cebyd4axhm.uksouth-01.azurewebsites.net${endpoints.updateConsent}`,
  { consentDetails: checkboxes },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
      console.log('Response:', response.data);
      setTermsAccepted(true);
      setShowSuccessPopup(true);
    setTimeout(()=>{
       window.location.href = '/';
    },2000)
       
     
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const openPDF = (pdfUrl) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>Legal Documents</h1>
          <p className='text-lg text-gray-600'>View our comprehensive legal documentation</p>
        </div>

        {/* PDF Sections Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-8'>
          {pdfSections?.map((section) => (
            <div
              key={section.id}
              className={`${section.color} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105`}
            >
              <div className='flex items-start justify-between mb-4'>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>{section.icon}</span>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>{section.title}</h3>
                    <p className='text-sm text-gray-600 mt-1'>{section.description}</p>
                  </div>
                </div>
              </div>

              <div className='flex justify-end'>
                <button
                  onClick={() => openPDF(section.pdfUrl)}
                  className='flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium shadow-sm'
                >
                  <Eye className='w-4 h-4' />
                  <span>Show PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {token && (
          <div className='mt-8 max-w-2xl mx-auto px-4'>
            <div className='bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition-all'>
              {/* Header */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-1'>
                    🚨 Accept Privacy Policy
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    Please review and accept all policies to continue.
                  </p>
                </div>
              </div>

              {/* Checkbox Group */}
              <div className='space-y-5 mb-6'>
                {[
                  {
                    id: 'termsOfUse',
                    label: 'Accept Terms of Use',
                    description: 'I accept the terms of service and user agreement.',
                    checked: checkboxes.termsOfUse,
                    color: 'blue',
                    required: true,
                  },
                  {
                    id: 'privacyPolicy',
                    label: 'Accept Privacy Policy',
                    description: 'I understand how my data will be collected and used.',
                    checked: checkboxes.privacyPolicy,
                    color: 'blue',
                    required: true,
                  },
                  {
                    id: 'shareWithGP',
                    label: 'Accept Share with GP',
                    description: 'I consent to sharing my information with General Practitioner.',
                    checked: checkboxes.shareWithGP,
                    color: 'blue',
                    required: true,
                  },
                  {
                    id: 'marketingPolicy',
                    label: 'Accept Marketing Communications',
                    description: 'I agree to receive marketing communications.',
                    checked: checkboxes.marketingPolicy,
                    color: 'blue',
                    required: false,
                  },
                ].map(({ id, label, description, checked, color, required }) => (
                  <label
                    key={id}
                    className='flex items-start sm:items-center space-x-4 cursor-pointer group transition-all'
                  >
                    {/* Custom Checkbox */}
                    <div className='relative flex-shrink-0 mt-1'>
                      <input
                        id={id}
                        type='checkbox'
                        checked={checked}
                        onChange={() => handleCheckboxChange(id)}
                        className='sr-only'
                        required={required}
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 transition-all duration-200 flex items-center justify-center ${
                          checked
                            ? colorClassMap[color]
                            : required
                              ? 'border-red-400 group-hover:border-red-500'
                              : 'border-gray-300 group-hover:border-gray-400'
                        }`}
                      >
                        {checked && (
                          <svg
                            className='w-3 h-3 text-white'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                          >
                            <path d='M5 13l4 4L19 7' />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className='text-sm'>
                      <span className='font-medium text-gray-900 dark:text-gray-100'>
                        {label}
                        {required && <span className='text-red-500 ml-1'>*</span>}
                      </span>
                      <p className='text-gray-600 dark:text-gray-400'>{description}</p>
                      {required && !checked && (
                        <p className='text-red-500 text-xs mt-1'>This field is required</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>

              {/* Submit Button */}
              <div className='flex justify-end'>
                <button
                  onClick={handleSubmit}
                  disabled={!allCheckboxesChecked || loading}
                  className={`px-6 py-3 rounded-lg font-semibold text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                    ${
                      allCheckboxesChecked && !loading
                        ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {loading ? (
                    <span className='flex items-center space-x-2'>
                      <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'></path>
                      </svg>
                      <span>Processing...</span>
                    </span>
                  ) : (
                    allCheckboxesChecked ? '✅ Accept All & Continue' : 'Please accept all policies'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Popup (toast) - only contains the confirmation message */}
      {showSuccessPopup && (
        <>
          <SuccessTermsPopup />
        </>
      )}
    </div>
  );
};

export default TermsAndConditions;
