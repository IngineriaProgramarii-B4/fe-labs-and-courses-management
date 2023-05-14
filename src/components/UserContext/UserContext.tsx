import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export default function UserContextProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const [isUserModified, setIsUserModified] = useState<boolean>(false);
  return (
    <UserContext.Provider
      value={{
        isUserModified,
        setIsUserModified,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
