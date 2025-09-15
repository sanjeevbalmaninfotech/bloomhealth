// utils/validation.js
export const validateField = (name, value, formData = {}) => {
  let error = '';

  switch (name) {
    case 'email':
      if (!value) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
      break;

    case 'password':
      if (!value) error = 'Password is required';
      else if (value.length < 8) error = 'Password must be at least 8 characters';
      break;

    case 'confirmPassword':
      if (!value) error = 'Confirm password is required';
      else if (value !== formData.password) error = 'Passwords do not match';
      break;

    case 'username':
      if (!value) error = 'Username is required';
      else if (value.length < 3) error = 'Username must be at least 3 characters';
      break;

    case 'firstName':
    case 'lastName':
      if (!value) error = `${name} is required`;
      break;

    case 'gender':
      if (!value) error = 'Gender is required';
      break;

    case 'dateOfBirth':
      if (!value) error = 'Date of birth is required';
      break;

    case 'phoneNumber':
      if (value && !/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits';
      break;

    case 'address.street':
    case 'address.city':
    case 'address.state':
    case 'address.zip':
    case 'address.country':
      // optional validation: required only if you want
      break;

    default:
      break;
  }

  return error; // empty string if valid
};

// Validate all fields
export const validateForm = (fields) => {
  const errors = {};
  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    const error = validateField(key, value, fields);
    if (error) errors[key] = error;
  });
  return errors;
};


