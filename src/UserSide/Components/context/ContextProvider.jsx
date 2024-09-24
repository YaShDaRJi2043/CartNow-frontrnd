import React, { createContext, useState } from "react";

export const LoginDataContext = createContext();

const ContextProvider = ({ children }) => {
  const [loginDataCalled, setLoginDataCalled] = useState(true);

  return (
    <>
      <LoginDataContext.Provider
        value={{ loginDataCalled, setLoginDataCalled }}
      >
        {children}
      </LoginDataContext.Provider>
    </>
  );
};

export default ContextProvider;
