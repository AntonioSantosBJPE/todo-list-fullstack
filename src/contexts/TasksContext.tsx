"use client";
import { TtaskCreateRequest, TtaskUpdateRequest } from "@/app/api/tasks/types";
import { api } from "@/database/api";
import { Task } from "@prisma/client";
import { createContext, useState } from "react";
import { ItaskContext, ItaskProviderProps, TmodalTypes } from "./types";

export const TaskContext = createContext({} as ItaskContext);

export const TaskProvider = ({ children }: ItaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<TmodalTypes>("createTask");
  const [taskInModal, setTaskInModal] = useState<Task>();
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const openModal = (type: TmodalTypes, task?: Task) => {
    if (task) setTaskInModal(task);
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteTask = async () => {
    try {
      setIsLoadingModal(true);
      await api.delete(`/api/tasks/${taskInModal!.id}`);

      const filterTaskDelete = tasks?.filter(
        (item) => item.id !== taskInModal!.id
      );
      setTasks(filterTaskDelete);
      closeModal();
    } catch (error) {
      setIsLoadingModal(false);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const updateTask = async (data: TtaskUpdateRequest) => {
    try {
      setIsLoadingModal(true);
      await api.patch(`/api/tasks/${taskInModal!.id}`, data);

      const filterTaskUpdate = tasks?.map((item) =>
        item.id === taskInModal!.id ? { ...item, ...data } : item
      );
      setTasks(filterTaskUpdate);
      closeModal();
    } catch (error) {
      setIsLoadingModal(false);
    } finally {
      setIsLoadingModal(false);
    }
  };

  const createTask = async (data: TtaskCreateRequest) => {
    try {
      setIsLoadingModal(true);
      const response = await api.post<Task>(`/api/tasks/`, data);

      setTasks((oldListTask) => [...oldListTask!, response.data]);
      closeModal();
    } catch (error) {
      setIsLoadingModal(false);
    } finally {
      setIsLoadingModal(false);
    }
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        deleteTask,
        modalIsOpen,
        modalType,
        openModal,
        closeModal,
        isLoadingModal,
        taskInModal,
        setTaskInModal,
        updateTask,
        setIsLoadingModal,
        createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
