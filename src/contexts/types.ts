import { ReactNode } from "react";

export interface IauthContext {}
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
