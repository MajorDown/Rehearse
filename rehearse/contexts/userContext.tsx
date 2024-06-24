'use client'
import { useEffect, Context, createContext, useContext, useState, PropsWithChildren } from "react";
import getConnectedUser from "@/tools/frontend/local/getConnectedUser";
import { ConnectedUser, UserContext } from "@/types";

const userContext: Context<UserContext> = createContext<UserContext>({
  connectedUser: null, updateConnectedUser: () => {}
});

export function useUserContext(): UserContext {
  const context = useContext(userContext);
  return context;
}

/**
 * contexte global de l'utilisateur connecté
 * @param children
 * @return {JSX.Element}
*/
export const UserProvider = ({ children }: PropsWithChildren<{}>): JSX.Element => {  
  const [connectedUser, updateConnectedUser] = useState<ConnectedUser | null>(getConnectedUser);

  // SYNCHRONISATION DU LOCALSTORAGE AVEC LE USER
  useEffect(() => {
    if (window) {
      if (connectedUser) {
        localStorage.setItem('rehearse-connected-user', JSON.stringify(connectedUser));
      } else {
        localStorage.removeItem('rehearse-connected-user');
      }
    }
  }, [connectedUser]);

  return (
    <userContext.Provider value={{connectedUser, updateConnectedUser}}>
      {children}
    </userContext.Provider>
  );
};
