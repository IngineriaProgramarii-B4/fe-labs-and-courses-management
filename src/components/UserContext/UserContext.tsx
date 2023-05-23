import React, { createContext, useState } from "react";

const defaultValues = {
  isUserModified: false,
  setIsUserModified: (val: boolean) => {},
};

export const UserContext = createContext(defaultValues);

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
