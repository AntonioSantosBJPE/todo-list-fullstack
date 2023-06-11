"use client";
import { taskCreateSchema } from "@/app/api/tasks/schema";
import { TtaskCreateRequest } from "@/app/api/tasks/types";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";
import { TaskContext } from "@/contexts/TasksContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export const ModalCreateTask = () => {
  const { isLoadingModal, createTask } = useContext(TaskContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TtaskCreateRequest>({
    mode: "onBlur",
    resolver: zodResolver(taskCreateSchema),
  });

  const submitCreateTask = async ({ title }: TtaskCreateRequest) => {
    createTask({ title });
  };
  return (
    <div className="h-fit  w-full  overflow-auto">
      <h2 className="text-xl text-center">Criar task</h2>
      <form
        noValidate
        onSubmit={handleSubmit(submitCreateTask)}
        className="w-full  flex flex-col gap-4"
      >
        <Input
          id="input-title"
          labelName="Título"
          type="text"
          placeholder="Digite o título da sua task"
          linkForm={register("title")}
          error={errors.title?.message}
        />
        <button
          className="w-full h-14 mt-3 bg-teal-400 hover:bg-teal-300 disabled:bg-teal-600 disabled:text-zinc-500 disabled:cursor-progress  rounded-md text-xl text-zinc-950  font-bold transition-all duration-500"
          disabled={isLoadingModal}
          type="submit"
        >
          {isLoadingModal ? <Spinner /> : "Criar task"}
        </button>
      </form>
    </div>
  );
};
