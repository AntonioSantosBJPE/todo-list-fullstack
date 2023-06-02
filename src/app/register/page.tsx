"use client";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { schema, TregisterUser } from "./schema";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TregisterUser>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const accountRegister = async (data: TregisterUser) => {
    console.log(data);
    try {
    } catch (error: any) {
    } finally {
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-cyan-300 via-sky-400 to-teal-500 flex items-center  p-2.5 ">
      <main className="relative w-full max-w-screen-md h-full mx-auto my-0 bg-zinc-100  flex flex-col md:flex-row items-center justify-center gap-7 px-3 py-12 rounded-lg">
        <Image
          src={"/shape-img.svg"}
          alt="img-shape"
          width={200}
          height={200}
          priority={true}
          className="absolute top-0 left-0 rounded-lg"
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
            className=" relative z-40 "
          />
        </div>

        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
          <form
            noValidate
            onSubmit={handleSubmit(accountRegister)}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            <Input
              id="input-name"
              labelName="Nome"
              type="text"
              placeholder="Digite seu nome"
              linkForm={register("name")}
              error={errors.name?.message}
            />

            <Input
              id="input-email"
              labelName="Email"
              type="email"
              placeholder="Digite seu email"
              linkForm={register("email")}
              error={errors.email?.message}
            />

            <Input
              id="input-password"
              labelName="Senha"
              type="password"
              placeholder="Digite sua senha"
              linkForm={register("password")}
              error={errors.password?.message}
            />

            <Input
              id="input-confirmPassword"
              labelName="Confirme sua senha"
              type="password"
              placeholder="Confirme sua senha"
              linkForm={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <button
              type="submit"
              className="w-full h-14 mt-3 bg-teal-400 hover:bg-teal-300 disabled:bg-teal-600 disabled:text-zinc-500  rounded-md text-xl text-zinc-950  font-bold transition-all duration-500"
            >
              Registrar
            </button>
            <div className=" flex flex-col gap-1 w-full">
              <p className="text-base text-zinc-800 font-semibold text-center leading-5">
                Já possui conta?{" "}
                <Link
                  className="text-teal-700  hover:text-teal-600 hover:underline transition-all duration-500 "
                  href={"/login"}
                >
                  Entrar
                </Link>
              </p>
              <p className="text-base text-zinc-800 font-semibold text-center leading-5">
                ou
              </p>
              <p className="text-base text-zinc-800 font-semibold text-center leading-5">
                Deseja voltar para página inicial?{" "}
                <Link
                  className="text-teal-700  hover:text-teal-600 hover:underline transition-all duration-500 "
                  href={"/"}
                >
                  Home
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
export default Register;
