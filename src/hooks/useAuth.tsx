import { useContext, useDebugValue } from 'react';
import AuthContext from '../context/AuthProvider';

const useAuth = () => {
  const { auth } = useContext(AuthContext);

  // for react dev tools to see indicator in the Auth value
  useDebugValue(auth, (auth) => (auth?.email ? 'Logged In' : 'Logged Out'));
  return useContext(AuthContext);
};

export default useAuth;
