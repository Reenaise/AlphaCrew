import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';

let router = null;

export const setRouter = (routerInstance) => {
  router = routerInstance;
};

const token = ref(localStorage.getItem('token') || '');
const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));

export default {
  async login(email, password) {
    try {
      const response = await fetch('http://localhost:5001/servers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        token.value = data.token;
        user.value = data.user;
        return true;
      } else {
        throw new Error(data.error || 'Invalid email or password');
      }
    } catch (error) {
      throw new Error(error.message || 'An error occurred. Please try again later.');
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token.value = '';
    user.value = {};
    if (router) {
      router.push('/login');
    } else {
      console.error('Router not initialized in authHelper');
      window.location.href = '/login';
    }
  },

  isAuthenticated() {
    if (!token.value) return false;
    
    try {
      const decoded = jwtDecode(token.value);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  },

  getToken() {
    return token.value;
  },

  getUser() {
    return user.value;
  },

  getTokenExpiration() {
    if (!token.value) return null;
    try {
      const decoded = jwtDecode(token.value);
      return decoded.exp;
    } catch {
      return null;
    }
  },

  async fetchUserData(userId) {
    const token = this.getToken();

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    try {
      const response = await fetch(`http://localhost:5001/servers/user/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.error || 'Failed to fetch user data');
      }
    } catch (error) {
      throw new Error(error.message || 'An error occurred while fetching user data.');
    }
  },
};