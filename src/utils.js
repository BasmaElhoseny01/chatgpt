export const EmailFormat = (email) => {
  if (/\S+@\S+\.\S+/.test(email)) return true;
  return false;
};


//redirect to the home page(./) after time
export const redirectHome = (time = 0) => {
  setTimeout(() => {
    // Redirect to home page
    window.location.pathname = '';
  }, time);
};

// redirect to the login page (./login) after time
export const redirectLogin = (time = 0) => {
  setTimeout(() => {
    // Redirect to login page
    window.location.pathname = 'login';
  }, time);
};
