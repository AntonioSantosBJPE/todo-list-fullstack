"use client";

import { FormRegister } from "@/components/Forms/FormRegister";
import { AuthProvider } from "@/contexts/AuthContext";
import Image from "next/image";

const Register = () => {
  return (
    <AuthProvider>
      <div className="w-full min-h-screen bg-gradient-to-r from-cyan-300 via-sky-400 to-teal-500 flex items-center  p-2.5 ">
        <main className="relative w-full max-w-screen-md h-full mx-auto my-0 bg-zinc-100  flex flex-col md:flex-row items-center justify-center gap-7 px-3 py-12 rounded-lg">
          <Image
            src={"/shape-img.svg"}
            alt="img-shape"
            width={200}
            height={200}
            priority={true}
            className="absolute top-0 left-0 rounded-lg w-auto h-auto"
          />

          <div className="w-full md:w-1/2 h-full my-5 flex flex-col items-center justify-center gap-5 ">
            <div>
              <h2 className="text-zinc-950 text-2xl font-bold text-center leading-8 relative z-40">
                Bem vindo!
              </h2>
              <h3 className="text-zinc-950 text-base font-bold text-center leading-8 relative z-40">
                Vamos ajudá-lo a concluir suas tarefas!
              </h3>
            </div>
            <Image
              src={"/page-login-img.svg"}
              alt="img-page-register"
              width={180}
              height={180}
              priority={true}
              className=" relative z-40 w-auto h-auto"
            />
          </div>

          <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
            <FormRegister />
          </div>
        </main>
      </div>
    </AuthProvider>
  );
};
export default Register;
