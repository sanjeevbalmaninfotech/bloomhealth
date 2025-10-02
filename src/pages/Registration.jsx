import { useEffect, useState } from 'react';
import { EyeOff, Eye, CheckCircle, XCircle, Loader, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { post, handle } from '../services/apiClient';
import { toast } from 'react-toastify';
import { Logo } from '../components/logo';

const Registration = () => {
  const [formData, setFormData] = useState({
    Salutation: 'Mr',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    DateOfBirth: '',
    Gender: 'Male',
    PhoneNumber: '',
    PhoneCode: '+91',
    Email: '',
    CountryId: '78',
    DistrictName: '',
    EthnicGroupMain: 'Other Ethnic Group',
    KinEmergencyContacts: [
      {
        KinFirstName: '',
        KinLastName: '',
        RelationShip: '',
      }
    ],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateName = (name, fieldName) => {
    if (!name) return `${fieldName} is required`;
    if (name.length < 2) return `${fieldName} must be at least 2 characters`;
    if (!/^[a-zA-Z\s]+$/.test(name)) return `${fieldName} can only contain letters and spaces`;
    return '';
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'Phone number is required';
    if (!/^\d{10}$/.test(phoneNumber)) return 'Please enter a valid 10-digit phone number';
    return '';
  };

  const validateDateOfBirth = (dob) => {
    if (!dob) return 'Date of birth is required';
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 0 || age > 150) return 'Please enter a valid date of birth';
    return '';
  };

  const validateRequired = (value, fieldName) => {
    if (!value || value.toString().trim() === '') return `${fieldName} is required`;
    return '';
  };

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return { age: '', ageUnit: 'Y' };
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    
    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
      years--;
      months += 12;
    }

    if (years > 0) {
      return { age: `${years}Y`, ageUnit: 'Y' };
    } else if (months > 0) {
      return { age: `${months}M`, ageUnit: 'M' };
    } else {
      const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
      return { age: `${days}D`, ageUnit: 'D' };
    }
  };

  // Real-time validation
  const validateFieldRealTime = (name, value, index = null) => {
    let error = '';
    
    if (name.startsWith('KinEmergencyContacts')) {
      const field = name.split('.')[1];
      switch (field) {
        case 'KinFirstName':
          error = validateName(value, 'First name');
          break;
        case 'KinLastName':
          error = validateName(value, 'Last name');
          break;
        case 'RelationShip':
          error = validateRequired(value, 'Relationship');
          break;
        default:
          break;
      }
    } else {
      switch (name) {
        case 'FirstName':
          error = validateName(value, 'First name');
          break;
        case 'LastName':
          error = validateName(value, 'Last name');
          break;
        case 'Email':
          error = validateEmail(value);
          break;
        case 'PhoneNumber':
          error = validatePhoneNumber(value);
          break;
        case 'DateOfBirth':
          error = validateDateOfBirth(value);
          break;
        case 'Gender':
          error = validateRequired(value, 'Gender');
          break;
        case 'Salutation':
          error = validateRequired(value, 'Salutation');
          break;
        case 'DistrictName':
          error = validateRequired(value, 'District');
          break;
        default:
          break;
      }
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    if (touched[name]) {
      const error = validateFieldRealTime(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleKinChange = (index, field, value) => {
    const newContacts = [...formData.KinEmergencyContacts];
    newContacts[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      KinEmergencyContacts: newContacts,
    }));

    // Real-time validation for kin contacts
    const fieldKey = `KinEmergencyContacts.${index}.${field}`;
    if (touched[fieldKey]) {
      const error = validateFieldRealTime(`KinEmergencyContacts.${field}`, value, index);
      setErrors((prev) => ({
        ...prev,
        [fieldKey]: error,
      }));
    }
  };

  const addKinContact = () => {
    setFormData((prev) => ({
      ...prev,
      KinEmergencyContacts: [
        ...prev.KinEmergencyContacts,
        {
          KinFirstName: '',
          KinLastName: '',
          RelationShip: '',
        }
      ],
    }));
  };

  const removeKinContact = (index) => {
    if (formData.KinEmergencyContacts.length > 1) {
      const newContacts = formData.KinEmergencyContacts.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        KinEmergencyContacts: newContacts,
      }));
      
      // Clear errors for removed contact
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(`KinEmergencyContacts.${index}`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
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

  const handleKinBlur = (index, field) => {
    const fieldKey = `KinEmergencyContacts.${index}.${field}`;
    setTouched((prev) => ({ ...prev, [fieldKey]: true }));
    
    const value = formData.KinEmergencyContacts[index][field];
    const error = validateFieldRealTime(`KinEmergencyContacts.${field}`, value, index);
    setErrors((prev) => ({
      ...prev,
      [fieldKey]: error,
    }));
  };

  // Comprehensive form validation
  const validateAllFields = () => {
    const newErrors = {};

    // Validate main fields
    newErrors.FirstName = validateName(formData.FirstName, 'First name');
    newErrors.LastName = validateName(formData.LastName, 'Last name');
    newErrors.Email = validateEmail(formData.Email);
    newErrors.PhoneNumber = validatePhoneNumber(formData.PhoneNumber);
    newErrors.DateOfBirth = validateDateOfBirth(formData.DateOfBirth);
    newErrors.Gender = validateRequired(formData.Gender, 'Gender');
    newErrors.Salutation = validateRequired(formData.Salutation, 'Salutation');
    newErrors.DistrictName = validateRequired(formData.DistrictName, 'District');

    // Validate kin emergency contacts
    formData.KinEmergencyContacts.forEach((contact, index) => {
      const kinFirstNameError = validateName(contact.KinFirstName, 'First name');
      const kinLastNameError = validateName(contact.KinLastName, 'Last name');
      const relationshipError = validateRequired(contact.RelationShip, 'Relationship');

      if (kinFirstNameError) newErrors[`KinEmergencyContacts.${index}.KinFirstName`] = kinFirstNameError;
      if (kinLastNameError) newErrors[`KinEmergencyContacts.${index}.KinLastName`] = kinLastNameError;
      if (relationshipError) newErrors[`KinEmergencyContacts.${index}.RelationShip`] = relationshipError;
    });

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
      'FirstName', 'LastName', 'Email', 'PhoneNumber', 'DateOfBirth',
      'Gender', 'Salutation', 'DistrictName'
    ];
    
    const newTouched = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });

    // Mark kin contacts as touched
    formData.KinEmergencyContacts.forEach((_, index) => {
      newTouched[`KinEmergencyContacts.${index}.KinFirstName`] = true;
      newTouched[`KinEmergencyContacts.${index}.KinLastName`] = true;
      newTouched[`KinEmergencyContacts.${index}.RelationShip`] = true;
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
      // Calculate age
      const { age, ageUnit } = calculateAge(formData.DateOfBirth);
      const patientAge = parseInt(age);

      // Format the date properly
      const dob = new Date(formData.DateOfBirth);
      const formattedDOB = dob.toISOString().split('T')[0];
      
      // Create current timestamp
      const now = new Date();
      const createdOn = now.toISOString().slice(0, 19).replace('T', ' ');

      // Build short name
      const shortName = `${formData.FirstName} ${formData.LastName}`.trim();

      // Prepare kin contacts with relationship options
      const kinContacts = formData.KinEmergencyContacts.map(contact => ({
        PatientId: 0,
        KinFirstName: contact.KinFirstName,
        KinLastName: contact.KinLastName,
        RelationShip: contact.RelationShip,
        relationshipOptions: ["Parent", "Sibling", "Spouse", "Friend"]
      }));

      const payload = {
        PatientId: 0,
        showParentFields: false,
        patientAge: patientAge,
        PatientName: "",
        PatientNo: 0,
        Salutation: formData.Salutation,
        FirstName: formData.FirstName,
        MiddleName: formData.MiddleName || null,
        LastName: formData.LastName,
        DateOfBirth: formattedDOB,
        Gender: formData.Gender,
        CreatedOn: createdOn,
        CreatedBy: 1,
        ShortName: shortName,
        PhoneNumber: formData.PhoneNumber,
        PhoneCode: formData.PhoneCode,
        Email: formData.Email,
        CountryId: formData.CountryId,
        Age: age,
        AgeUnit: ageUnit,
        IsActive: true,
        DistrictName: formData.DistrictName,
        IsPhoneVerified: true,
        EthnicGroupMain: formData.EthnicGroupMain,
        KinEmergencyContacts: kinContacts,
      };

      const registerUrl = 'http://localhost:8088/patients/register';
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

  const relationshipOptions = ["Parent", "Sibling", "Spouse", "Friend"];

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-8 px-4'>
      <div className='w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 border border-gray-100 my-8'>
        <div className='flex justify-center mb-6'>
          <Logo className='h-12 w-auto' />
        </div>

        <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>Patient Registration</h2>
        <p className='text-center text-gray-500 text-sm mb-6'>
          Please fill in your details to register
        </p>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Salutation & Gender */}
          <div className='flex gap-4'>
            <div className='w-32'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Salutation</label>
              <select
                name='Salutation'
                value={formData.Salutation}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-2 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.Salutation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              >
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Ms'>Ms</option>
                <option value='Dr'>Dr</option>
              </select>
              {errors.Salutation && <p className='text-red-500 text-xs mt-1'>{errors.Salutation}</p>}
            </div>
            
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Gender</label>
              <select
                name='Gender'
                value={formData.Gender}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.Gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              >
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
              </select>
              {errors.Gender && <p className='text-red-500 text-xs mt-1'>{errors.Gender}</p>}
            </div>
          </div>

          {/* Name Fields */}
          <div className='grid grid-cols-3 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>First Name*</label>
              <input
                type='text'
                name='FirstName'
                placeholder='First Name'
                value={formData.FirstName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.FirstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              />
              {errors.FirstName && <p className='text-red-500 text-xs mt-1'>{errors.FirstName}</p>}
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Middle Name</label>
              <input
                type='text'
                name='MiddleName'
                placeholder='Middle Name'
                value={formData.MiddleName}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition border-gray-300 focus:ring-blue-500 ${
                  isLoading ? 'bg-gray-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
            
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Last Name*</label>
              <input
                type='text'
                name='LastName'
                placeholder='Last Name'
                value={formData.LastName}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                  errors.LastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                required
              />
              {errors.LastName && <p className='text-red-500 text-xs mt-1'>{errors.LastName}</p>}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Date of Birth*</label>
            <input
              type='date'
              name='DateOfBirth'
              value={formData.DateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.DateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required
            />
            {errors.DateOfBirth && <p className='text-red-500 text-xs mt-1'>{errors.DateOfBirth}</p>}
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Email*</label>
            <input
              type='email'
              name='Email'
              placeholder='Email'
              value={formData.Email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.Email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required
            />
            {errors.Email && <p className='text-red-500 text-xs mt-1'>{errors.Email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Phone Number*</label>
            <div className='flex items-center gap-2'>
              <div className='w-32'>
                <select
                  name='PhoneCode'
                  value={formData.PhoneCode}
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
              <div className='flex-1'>
                <input
                  type='tel'
                  name='PhoneNumber'
                  placeholder='Phone Number'
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isLoading}
                  className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                    errors.PhoneNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                  } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
            {errors.PhoneNumber && <p className='text-red-500 text-xs mt-1'>{errors.PhoneNumber}</p>}
          </div>

          {/* District */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>District*</label>
            <input
              type='text'
              name='DistrictName'
              placeholder='District'
              value={formData.DistrictName}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                errors.DistrictName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required
            />
            {errors.DistrictName && <p className='text-red-500 text-xs mt-1'>{errors.DistrictName}</p>}
          </div>

          {/* Emergency Contacts */}
          <div className='mt-6'>
            <div className='flex items-center justify-between mb-3'>
              <h4 className='text-gray-700 font-medium'>Emergency Contacts</h4>
              <button
                type='button'
                onClick={addKinContact}
                disabled={isLoading}
                className='flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium disabled:opacity-50'
              >
                <Plus className='h-4 w-4' />
                Add Contact
              </button>
            </div>

            <div className='space-y-4'>
              {formData.KinEmergencyContacts.map((contact, index) => (
                <div key={index} className='border border-gray-200 rounded-lg p-4 bg-gray-50'>
                  <div className='flex items-center justify-between mb-3'>
                    <p className='text-sm font-medium text-gray-700'>Contact {index + 1}</p>
                    {formData.KinEmergencyContacts.length > 1 && (
                      <button
                        type='button'
                        onClick={() => removeKinContact(index)}
                        disabled={isLoading}
                        className='text-red-500 hover:text-red-700 disabled:opacity-50'
                      >
                        <Trash2 className='h-4 w-4' />
                      </button>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    <div>
                      <input
                        type='text'
                        placeholder='First Name*'
                        value={contact.KinFirstName}
                        onChange={(e) => handleKinChange(index, 'KinFirstName', e.target.value)}
                        onBlur={() => handleKinBlur(index, 'KinFirstName')}
                        disabled={isLoading}
                        className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                          errors[`KinEmergencyContacts.${index}.KinFirstName`] 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      />
                      {errors[`KinEmergencyContacts.${index}.KinFirstName`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`KinEmergencyContacts.${index}.KinFirstName`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type='text'
                        placeholder='Last Name*'
                        value={contact.KinLastName}
                        onChange={(e) => handleKinChange(index, 'KinLastName', e.target.value)}
                        onBlur={() => handleKinBlur(index, 'KinLastName')}
                        disabled={isLoading}
                        className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                          errors[`KinEmergencyContacts.${index}.KinLastName`] 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      />
                      {errors[`KinEmergencyContacts.${index}.KinLastName`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`KinEmergencyContacts.${index}.KinLastName`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <select
                        value={contact.RelationShip}
                        onChange={(e) => handleKinChange(index, 'RelationShip', e.target.value)}
                        onBlur={() => handleKinBlur(index, 'RelationShip')}
                        disabled={isLoading}
                        className={`w-full pl-3 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:outline-none transition ${
                          errors[`KinEmergencyContacts.${index}.RelationShip`] 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        } ${isLoading ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}`}
                      >
                        <option value=''>Relationship*</option>
                        {relationshipOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                      {errors[`KinEmergencyContacts.${index}.RelationShip`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`KinEmergencyContacts.${index}.RelationShip`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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
                Registering...
              </>
            ) : (
              'Register'
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