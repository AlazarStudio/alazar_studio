export const login = (username, password) => {
  //   if (username === 'alazar-admin-panel' && password === 'A%#*PIUtiogj7') {
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('isAuth', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAuth');
};

export const isAuthenticated = () => {
  return localStorage.getItem('isAuth') === 'true';
};
