import { toast } from 'react-toastify';

export const showToast = {
  success: (message) => toast.success(message, { duration: 4000 }),
  error: (message) => toast.error(message, { duration: 4000 }),
  info: (message) => toast(message, { duration: 4000 }),
};
