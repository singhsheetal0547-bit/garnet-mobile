import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const AI_ENGINE_URL = process.env.EXPO_PUBLIC_AI_ENGINE_URL;

// Create axios instances
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const aiClient = axios.create({
  baseURL: AI_ENGINE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
const handleError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    if (status === 401) {
      // Unauthorized - clear token and redirect to login
      AsyncStorage.removeItem('authToken');
      // Navigate to login screen
    }
    
    throw new Error(data.message || 'An error occurred');
  } else if (error.request) {
    // Request made but no response
    throw new Error('Network error. Please check your connection.');
  } else {
    // Something else happened
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

apiClient.interceptors.response.use(
  (response) => response,
  handleError
);

aiClient.interceptors.response.use(
  (response) => response,
  handleError
);

export { apiClient, aiClient };
export default apiClient;
