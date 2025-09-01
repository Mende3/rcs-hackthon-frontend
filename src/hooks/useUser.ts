// hooks/useUser.ts
import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User } from '../services/authService'; // 👈 importa só o tipo

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = authService.getUser();
    setUser(userData);
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const updateUser = (newUserData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...newUserData };
      setUser(updatedUser);

      // 👇 salva no localStorage manualmente, já que setUser é private
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    isAuthenticated,
    updateUser,
  };
};
