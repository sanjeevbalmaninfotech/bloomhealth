import { toast } from "react-toastify";

export function handleAuthError(err) {
  if (err?.status === 403 || err?.data?.message?.toLowerCase().includes('expired')) {
    toast.error("Session expired. Please log in again.", { autoClose: 3000 });
    sessionStorage.clear();
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
    return true;
  }
  return false;
}

