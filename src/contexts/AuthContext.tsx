import { api } from "@/database/api";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { createContext, useState } from "react";
import { IauthContext, IauthProviderProps, IuserAuth } from "./types";

export const AuthContext = createContext({} as IauthContext);

export const AuthProvider = ({ children }: IauthProviderProps) => {
  const [userAuth, setUserAuth] = useState<IuserAuth>();
  const router = useRouter();
  const udpateuserAuth = (data: IuserAuth) => {
    setUserAuth((oldClient) => {
      return { ...oldClient, ...data };
    });
  };

  const logoutUserAuth = () => {
    api.defaults.headers.common.authorization = `Bearer`;
    destroyCookie(null, "@todo-list:token");

    router.push("/");
    setUserAuth(undefined);
  };

  return (
    <AuthContext.Provider value={{ udpateuserAuth, logoutUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
