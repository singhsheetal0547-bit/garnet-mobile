import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
  
  // User subscription info
  subscription: {
    plan: 'free', // 'free' | 'pro' | 'premium'
    credits: 0,
    expiresAt: null,
  },
  
  // Actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  
  setToken: async (token) => {
    if (token) {
      await AsyncStorage.setItem('authToken', token);
    } else {
      await AsyncStorage.removeItem('authToken');
    }
    set({ token });
  },
  
  setSubscription: (subscription) => set({ subscription }),
  
  login: async (user, token) => {
    await get().setToken(token);
    set({ 
      user, 
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },
  
  logout: async () => {
    await get().setToken(null);
    set({ 
      user: null, 
      token: null,
      isAuthenticated: false,
      subscription: {
        plan: 'free',
        credits: 0,
        expiresAt: null,
      },
    });
  },
  
  updateUser: (updates) => {
    const { user } = get();
    set({ user: { ...user, ...updates } });
  },
  
  loadStoredAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Validate token with backend
        // If valid, set user and token
        // For now, just set loading to false
        set({ token, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Load stored auth error:', error);
      set({ isLoading: false });
    }
  },
  
  hasProAccess: () => {
    const { subscription } = get();
    return subscription.plan === 'pro' || subscription.plan === 'premium';
  },
  
  hasCredits: () => {
    const { subscription } = get();
    return subscription.credits > 0;
  },
  
  useCredit: () => {
    const { subscription } = get();
    if (subscription.credits > 0) {
      set({ 
        subscription: { 
          ...subscription, 
          credits: subscription.credits - 1 
        } 
      });
      return true;
    }
    return false;
  },
}));

export default useAuthStore;
