'use client'
import { Context, createContext, useContext, useState, PropsWithChildren } from "react";
import {ConnectedUser, UserContext} from "@/types";

const userContext: Context<UserContext> = createContext<UserContext>(
  {
    user: null, updateUser: () => {}
  }
);

export function useUserContext(): UserContext {
  const context = useContext(userContext);
  return context;
}

export const UserProvider = (props: PropsWithChildren): JSX.Element => {
  const [user, updateUser] = useState<ConnectedUser | null>(null);

  return (
    <userContext.Provider value={{user, updateUser}}>
      {props.children}
    </userContext.Provider>
  );
};

