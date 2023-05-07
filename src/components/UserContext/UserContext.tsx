import React, { createContext, useState } from "react";

export const UserContext = createContext({});

// @ts-ignore
export default function UserContextProvider({ children }) {
  const [isUserModified, setIsUserModified] = useState<boolean>(false);
  return (
    <UserContext.Provider value={
      {
        isUserModified, setIsUserModified
      }
    }>
      {children}
    </UserContext.Provider>
  );
}