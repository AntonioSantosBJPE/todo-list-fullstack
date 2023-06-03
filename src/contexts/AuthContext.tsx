import { createContext, useState } from "react";
import { IauthContext, IauthProviderProps, IuserAuth } from "./types";

export const AuthContext = createContext({} as IauthContext);

export const AuthProvider = ({ children }: IauthProviderProps) => {
  const [userAuth, setUserAuth] = useState<IuserAuth>();

  return <AuthContext.Provider value={{}}></AuthContext.Provider>;
};
