import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void; // For demo purposes
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: async () => { throw new Error('Not implemented'); },
  logout: () => {},
  isAuthenticated: false,
  switchRole: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // In a real app, this would make an API call
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Store user in local storage
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // For demo purposes - allows switching roles
  const switchRole = (role: UserRole) => {
    if (!currentUser) return;
    
    // Find a user with the requested role
    const userWithRole = mockUsers.find(u => u.role === role);
    
    if (userWithRole) {
      localStorage.setItem('currentUser', JSON.stringify(userWithRole));
      setCurrentUser(userWithRole);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        login, 
        logout, 
        isAuthenticated: !!currentUser,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};