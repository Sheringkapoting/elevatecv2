
// This is a simple auth service for the React frontend
// In a real app, this would connect to your backend API

interface User {
  id: string;
  email: string;
  name?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterCredentials {
  email: string;
  password: string;
}

class AuthService {
  private storageKey = 'auth_user';

  async login(credentials: LoginCredentials): Promise<User> {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful login
    const user: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0]
    };
    
    // Save to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    
    return user;
  }
  
  async register(credentials: RegisterCredentials): Promise<User> {
    // In a real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful registration
    const user: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0]
    };
    
    // Save to localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(user));
    
    return user;
  }
  
  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
  
  getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.storageKey);
    return userData ? JSON.parse(userData) : null;
  }
  
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}

export const authService = new AuthService();
