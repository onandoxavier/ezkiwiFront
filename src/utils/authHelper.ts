export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('accessToken');
    
    return !token ? false: true;
  };
  