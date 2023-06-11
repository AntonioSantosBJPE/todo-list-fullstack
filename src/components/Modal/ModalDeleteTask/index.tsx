"use client";
import { Spinner } from "@/components/Spinner";
import { TaskContext } from "@/contexts/TasksContext";
import { useContext } from "react";

export const ModalDeleteTask = () => {
  const { isLoadingModal, deleteTask } = useContext(TaskContext);
  return (
    <div className="h-fit  w-full  overflow-auto">
      <h2 className="text-xl text-center">Deseja realmente apagar a task?</h2>
      <button
        className="w-full h-14 mt-3 bg-teal-400 hover:bg-teal-300 disabled:bg-teal-600 disabled:text-zinc-500 disabled:cursor-progress  rounded-md text-xl text-zinc-950  font-bold transition-all duration-500"
        disabled={isLoadingModal}
        onClick={deleteTask}
      >
        {isLoadingModal ? <Spinner /> : "Apagar task"}
      </button>
    </div>
  );
};
