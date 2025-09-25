import api, { get, post, put, deleteRequest, patch, setAuthToken, clearAuthToken } from '../lib/api';

// Simple wrapper to centralize common behaviors (e.g., error shapes)
const handle = async (promise) => {
  try {
    const data = await promise;
    return { data };
  } catch (err) {
    // normalize error
    const message = err?.response?.data?.message || err?.message || 'Unknown error';
    return { error: true, message, raw: err };
  }
};

export { api, get, post, put, deleteRequest as del, patch, setAuthToken, clearAuthToken, handle };

/* Usage example:
import { post, handle } from '@/services/apiClient';

// send request and handle normalized response
const resp = await handle(post('/login', { username, password }));
if (!resp.error) {
  // resp.data is response body
}
*/
