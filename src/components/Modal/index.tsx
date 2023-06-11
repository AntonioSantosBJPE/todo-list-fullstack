"use client";
import { TaskContext } from "@/contexts/TasksContext";
import Image from "next/image";
import { useContext } from "react";
import Modal from "react-modal";
import { ModalCreateTask } from "./ModalCreateTask";
import { ModalDeleteTask } from "./ModalDeleteTask";
import { ModalEditTask } from "./ModalEditTask";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: "520px",
    borderRadius: "8px",
    padding: 0,
    backgroundColor: "#FFFFFF",
  },
};

export const ModalCustom = () => {
  const { closeModal, modalIsOpen, modalType, deleteTask, isLoadingModal } =
    useContext(TaskContext);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div className="flex flex-col gap-2 px-6 pb-8">
        <header className="2-full flex h-14 items-center justify-between">
          <h3 className="text-base font-medium leading-5 text-grey1">{""}</h3>
          <button onClick={closeModal} className="w-6 h-6">
            <Image
              src={"/icon-close.svg"}
              width={24}
              height={24}
              alt={"close-button"}
              className="h-auto w-auto"
            />
          </button>
        </header>
        <div>
          {modalType == "deleteTask" && <ModalDeleteTask />}
          {modalType == "updateTask" && <ModalEditTask />}
          {modalType == "createTask" && <ModalCreateTask />}
        </div>
      </div>
    </Modal>
  );
};
