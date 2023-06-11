import { TtaskUpdateRequest } from "@/app/api/tasks/types";
import { TuserReturn } from "@/app/api/users/types";
import { Task } from "@prisma/client";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IauthContext {
  udpateuserAuth: (data: IuserAuth) => void;
  logoutUserAuth: () => void;
  userAuth: IuserAuth | undefined;
}
export interface IauthProviderProps {
  children: ReactNode;
}

export interface ItaskContext {
  tasks: Task[] | undefined;
  setTasks: Dispatch<SetStateAction<Task[] | undefined>>;
  deleteTask: () => Promise<void>;
  modalIsOpen: boolean;
  modalType: TmodalTypes;
  openModal: (type: TmodalTypes, task?: Task | undefined) => void;
  closeModal: () => void;
  isLoadingModal: boolean;
  taskInModal: Task | undefined;
  setTaskInModal: Dispatch<SetStateAction<Task | undefined>>;
  updateTask: (data: TtaskUpdateRequest) => Promise<void>;
  setIsLoadingModal: Dispatch<SetStateAction<boolean>>;
}

export interface ItaskProviderProps {
  children: ReactNode;
}

export interface IloginUser {
  accessToken: string;
}

export type IuserAuth = TuserReturn;
export type TmodalTypes = "udpateUser" | "updateTask" | "deleteTask";
