import React, { createContext, useState } from 'react';

const AuthContext = createContext<{
  auth: boolean;
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}>({ auth: false, setAuth: () => {} });

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
