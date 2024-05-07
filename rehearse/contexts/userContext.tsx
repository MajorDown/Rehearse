'use client'
import { useEffect, Context, createContext, useContext, useState, PropsWithChildren } from "react";
import { ConnectedUser, UserContext } from "@/types";

const userContext: Context<UserContext> = createContext<UserContext>({
  connectedUser: null, updateConnectedUser: () => {}
});

export function useUserContext(): UserContext {
  const context = useContext(userContext);
  return context;
}

export const UserProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  
  // SYNCHRONISATION DU USER AVEC LOCALSTORAGE
  const getConnectedUser = (): ConnectedUser | null => {
    const StringifiedUser = localStorage.getItem('rehearse-connected-user');
    return StringifiedUser ? JSON.parse(StringifiedUser) : null;
  };
  
  const [connectedUser, updateConnectedUser] = useState<ConnectedUser | null>(getConnectedUser);

  // SYNCHRONISATION DU LOCALSTORAGE AVEC LE USER
  useEffect(() => {
    if (connectedUser) {
      localStorage.setItem('rehearse-connected-user', JSON.stringify(connectedUser));
    } else {
      localStorage.removeItem('rehearse-connected-user');
    }
  }, [connectedUser]);

  return (
    <userContext.Provider value={{connectedUser, updateConnectedUser}}>
      {children}
    </userContext.Provider>
  );
};
