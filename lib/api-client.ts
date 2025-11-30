import { API_CONFIG } from './api-config';

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add existing headers
    if (fetchOptions.headers) {
      const existingHeaders = new Headers(fetchOptions.headers);
      existingHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', token });
  }

  // POST request
  async post<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      token,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', token });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Placeholder API functions - Replace with actual implementations

export const authApi = {
  login: async (email: string, password: string) => {
    // TODO: Implement actual API call
    return apiClient.post('/auth/login', { email, password });
  },
  
  register: async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    // TODO: Implement actual API call
    return apiClient.post('/auth/register', userData);
  },
  
  forgotPassword: async (email: string) => {
    // TODO: Implement actual API call
    return apiClient.post('/auth/forgot-password', { email });
  },
};

export const contactsApi = {
  getAll: async (token: string) => {
    // TODO: Implement actual API call
    return apiClient.get('/contacts', token);
  },
  
  create: async (contactData: any, token: string) => {
    // TODO: Implement actual API call
    return apiClient.post('/contacts/create', contactData, token);
  },
  
  update: async (id: string, contactData: any, token: string) => {
    // TODO: Implement actual API call
    return apiClient.put(`/contacts/${id}`, contactData, token);
  },
  
  delete: async (id: string, token: string) => {
    // TODO: Implement actual API call
    return apiClient.delete(`/contacts/${id}`, token);
  },
};

export const emergencyApi = {
  trigger: async (location: { lat: number; lng: number }, token: string) => {
    // TODO: Implement actual API call
    return apiClient.post('/emergency/trigger', { location }, token);
  },
  
  getHistory: async (token: string) => {
    // TODO: Implement actual API call
    return apiClient.get('/emergency/history', token);
  },
};

export const locationApi = {
  getCurrent: async (token: string) => {
    // TODO: Implement actual API call
    return apiClient.get('/location/current', token);
  },
  
  updateLocation: async (location: { lat: number; lng: number }, token: string) => {
    // TODO: Implement actual API call
    return apiClient.post('/location/update', { location }, token);
  },
  
  getHistory: async (token: string) => {
    // TODO: Implement actual API call
    return apiClient.get('/location/history', token);
  },
};

export const deviceApi = {
  getStatus: async (token: string) => {
    // TODO: Implement actual API call
    return apiClient.get('/device/status', token);
  },
  
  pairDevice: async (deviceId: string, token: string) => {
    // TODO: Implement actual API call
    return apiClient.post('/device/pair', { deviceId }, token);
  },
};
