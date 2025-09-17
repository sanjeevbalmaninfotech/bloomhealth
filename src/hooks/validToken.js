import { jwtDecode } from 'jwt-decode';

export async function validateTokenTime(token) {
  try {
    if (typeof token !== 'string' || !token.includes('.')) {
      throw new Error('Token is not a valid JWT format');
    }

    // Decode payload (no signature check)
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      throw new Error('Token has no expiration field (exp)');
    }

    const currentTime = Math.floor(Date.now() / 1000); // seconds
    if (decoded.exp < currentTime) {
      console.error('❌ Token expired');
      return { valid: false, expired: true, payload: decoded };
    }

    return { valid: true, expired: false, payload: decoded };
  } catch (err) {
    console.error('❌ Invalid token:', err.message);
    return { valid: false, expired: false, payload: null };
  }
}
