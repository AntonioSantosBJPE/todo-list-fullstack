import { Task } from "@prisma/client";
import { createContext, useState } from "react";
import { ItaskContext, ItaskProviderProps } from "./types";

export const TaskContext = createContext({} as ItaskContext);

export const TaskProvider = ({ children }: ItaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>();

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
