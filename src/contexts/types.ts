import { ReactNode } from "react";

export interface IauthContext {
  udpateuserAuth: (data: IuserAuth) => void;
  logoutUserAuth: () => void;
}
export interface IauthProviderProps {
  children: ReactNode;
}

export interface IloginUser {
  accessToken: string;
}

export interface IuserAuth {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}
