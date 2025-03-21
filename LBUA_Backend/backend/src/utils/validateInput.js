// backend/src/utils/validateInput.js

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const validatePassword = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  export const validateRequest = (request) => {
    const { labId, reason } = request;
    if (!labId || !reason) {
      return false;
    }
    return true;
  };
  