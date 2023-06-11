"use client";

import { Checkbox } from "@/components/Checkbox";
import { ModalCustom } from "@/components/Modal";
import { Spinner } from "@/components/Spinner";
import { AuthContext } from "@/contexts/AuthContext";
import { TaskContext } from "@/contexts/TasksContext";
import { IuserAuth } from "@/contexts/types";
import { api } from "@/database/api";
import { Task } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const [loadingFullPage, setLoadingFullPage] = useState(false);

  const { logoutUserAuth, userAuth, udpateuserAuth } = useContext(AuthContext);
  const { tasks, setTasks, deleteTask, openModal } = useContext(TaskContext);

  const router = useRouter();

  useEffect(() => {
    const { ["@todo-list:token"]: token } = parseCookies();

    if (!userAuth) {
      (async () => {
        try {
          api.defaults.headers.common.authorization = `Bearer ${token}`;
          const responseProfile = await api.get<IuserAuth>("/api/profile");

          const responseListTask = await api.get<Task[]>("/api/tasks");
          setTasks(responseListTask.data);
          udpateuserAuth(responseProfile.data);
          setLoadingFullPage(true);
        } catch (error) {
          console.error(error);
          api.defaults.headers.common.authorization = `Bearer`;
          destroyCookie(null, "@contacts-book:token");
          router.push("/");
        }
      })();
    } else {
      (async () => {
        try {
          const responseListTask = await api.get<Task[]>("/api/tasks");
          setTasks(responseListTask.data);
          setLoadingFullPage(true);
        } catch (error) {
          console.error(error);
          api.defaults.headers.common.authorization = `Bearer`;
          destroyCookie(null, "@contacts-book:token");
          router.push("/");
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-cyan-300 via-sky-400 to-teal-500 flex items-center  p-2.5 ">
      <main className="relative w-full max-w-screen-lg h-full mx-auto my-0 bg-zinc-100  flex flex-col  items-center justify-center gap-7 px-3 py-12 rounded-lg">
        <Image
          src={"/shape-img.svg"}
          alt="img-shape"
          width={200}
          height={200}
          priority={true}
          className="absolute top-0 left-0 rounded-lg w-auto h-auto"
        />
        {loadingFullPage ? (
          <>
            <section className="border relative w-full h-72 flex flex-col items-center justify-center gap-3 p-2">
              <div className="w-28 h-28 bg-teal-400 rounded-full flex items-center justify-center">
                <span className="text-8xl">
                  {userAuth?.name[0].toLocaleUpperCase()}
                </span>
              </div>

              <h2 className="text-zinc-950 text-center font-bold text-xl">
                {`Bem vindo ${userAuth?.name} !`}
              </h2>
              <button
                onClick={logoutUserAuth}
                className=" absolute top-2 right-2 w-26 h-10 p-2 border rounded-lg border-teal-500 hover:border-teal-400 hover:scale-90 flex justify-center items-center gap-2 transition-all ease-in duration-500"
              >
                <Image
                  src={"/icon-logout.svg"}
                  alt="edit contact"
                  width={25}
                  height={25}
                />
                Logout
              </button>
            </section>

            <section className="border w-full h-fit p-2 flex flex-col items-center justify-center gap-2">
              <Image
                src={"/watch-img.svg"}
                alt="img-watch"
                width={125}
                height={125}
                priority={true}
                className="w-auto h-auto"
              />

              <h2 className="text-zinc-950 text-center font-bold text-xl">
                Lista de tarefas
              </h2>

              <ul className="border relative bg-zinc-50 w-full h-fit p-3 flex flex-col gap-2 rounded-lg">
                {tasks?.map((task) => (
                  <li
                    className="w-full flex  overflow-x-auto p-2 border rounded-lg border-teal-500"
                    key={task.id}
                  >
                    <Checkbox task={task} />
                    <div className="w-full flex flex-col gap-2">
                      <h4
                        className={
                          task.isFinished
                            ? "text-zinc-950 font-bold text-base line-through"
                            : "text-zinc-950 font-bold text-base"
                        }
                      >
                        {task.title}
                      </h4>
                      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-2 ">
                        <p>
                          {new Date(task.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                        <div className="flex gap-2 ">
                          <button
                            className="w-24 h-10 p-2 border rounded-lg border-teal-500 hover:border-teal-400 hover:scale-90 flex justify-center items-center gap-2 transition-all ease-in duration-500"
                            onClick={() => openModal("updateTask", task)}
                          >
                            <Image
                              src={"/icon-edit.svg"}
                              alt="edit contact"
                              width={25}
                              height={25}
                            />
                            Editar
                          </button>
                          <button
                            className="w-24 h-10 p-2 border rounded-lg border-teal-500 hover:border-teal-400 hover:scale-90 flex justify-center items-center gap-2 transition-all ease-in duration-500"
                            onClick={() => openModal("deleteTask", task)}
                          >
                            <Image
                              src={"/icon-delete.svg"}
                              alt="delete contact"
                              width={25}
                              height={25}
                            />
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <Spinner />
        )}
      </main>
      <ModalCustom />
    </div>
  );
};
export default Dashboard;
