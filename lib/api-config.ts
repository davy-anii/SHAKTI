// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
};

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  
  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
    DELETE: '/user/delete',
    SETTINGS: '/user/settings',
  },
  
  // Emergency Contacts
  CONTACTS: {
    LIST: '/contacts',
    CREATE: '/contacts/create',
    UPDATE: '/contacts/:id',
    DELETE: '/contacts/:id',
    GET: '/contacts/:id',
  },
  
  // Emergency/SOS
  EMERGENCY: {
    TRIGGER: '/emergency/trigger',
    CANCEL: '/emergency/cancel',
    HISTORY: '/emergency/history',
    STATUS: '/emergency/status',
  },
  
  // Location/Tracking
  LOCATION: {
    CURRENT: '/location/current',
    HISTORY: '/location/history',
    SHARE: '/location/share',
    UPDATE: '/location/update',
  },
  
  // Device
  DEVICE: {
    STATUS: '/device/status',
    PAIR: '/device/pair',
    UNPAIR: '/device/unpair',
    BATTERY: '/device/battery',
    SETTINGS: '/device/settings',
  },
  
  // Guardian
  GUARDIAN: {
    DASHBOARD: '/guardian/dashboard',
    ALERTS: '/guardian/alerts',
    TRACKING: '/guardian/tracking/:userId',
    NOTIFICATIONS: '/guardian/notifications',
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    READ: '/notifications/:id/read',
    READ_ALL: '/notifications/read-all',
    DELETE: '/notifications/:id',
    SETTINGS: '/notifications/settings',
  },
};

// Helper function to build URL with params
export const buildUrl = (endpoint: string, params?: Record<string, string>) => {
  let url = endpoint;
  if (params) {
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
  }
  return `${API_CONFIG.BASE_URL}${url}`;
};
