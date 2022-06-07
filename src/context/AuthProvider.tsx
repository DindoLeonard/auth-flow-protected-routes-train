import React, { createContext, useState } from 'react';

const AuthContext = createContext<{
  auth: { email?: string; password?: string; accessToken?: string } | null;
  setAuth: React.Dispatch<
    React.SetStateAction<{
      email?: string;
      password?: string;
      accessToken?: string;
    } | null>
  >;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
  persist: boolean;
}>({ auth: null, setAuth: () => {}, persist: false, setPersist: () => {} });

export const AuthProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [auth, setAuth] = useState<{
    email?: string;
    password?: string;
    accessToken?: string;
  } | null>(null);

  const localstoragePersistValue = localStorage.getItem('persist');

  const [persist, setPersist] = useState(
    localstoragePersistValue ? JSON.parse(localstoragePersistValue) : false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
