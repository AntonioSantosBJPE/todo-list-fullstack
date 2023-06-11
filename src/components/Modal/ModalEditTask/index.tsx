"use client";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";
import { TaskContext } from "@/contexts/TasksContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { schema, TeditTask } from "./schema";

export const ModalEditTask = () => {
  const { isLoadingModal, updateTask, taskInModal } = useContext(TaskContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeditTask>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      title: taskInModal?.title,
    },
  });

  const submitEditTask = async ({ title }: TeditTask) => {
    updateTask({ title });
  };
  return (
    <div className="h-fit  w-full  overflow-auto">
      <h2 className="text-xl text-center">Editar task</h2>
      <form
        noValidate
        onSubmit={handleSubmit(submitEditTask)}
        className="w-full  flex flex-col gap-4"
      >
        <Input
          id="input-title"
          labelName="Título"
          type="text"
          placeholder="Digite seu email"
          linkForm={register("title")}
          error={errors.title?.message}
        />
        <button
          className="w-full h-14 mt-3 bg-teal-400 hover:bg-teal-300 disabled:bg-teal-600 disabled:text-zinc-500 disabled:cursor-progress  rounded-md text-xl text-zinc-950  font-bold transition-all duration-500"
          disabled={isLoadingModal}
          type="submit"
        >
          {isLoadingModal ? <Spinner /> : "Editar task"}
        </button>
      </form>
    </div>
  );
};
