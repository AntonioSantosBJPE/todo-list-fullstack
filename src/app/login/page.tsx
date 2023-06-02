"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { schema, TloginUser } from "./schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TloginUser>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const accountLogin = async (data: TloginUser) => {
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
          <h2 className="text-zinc-950 text-2xl font-bold text-center leading-8 relative z-40">
            Bem vindo de volta!
          </h2>

          <Image
            src={"/page-login-img.svg"}
            alt="img-page-login"
            width={180}
            height={180}
            priority={true}
            className=" relative z-40"
          />
        </div>

        <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center">
          <form
            noValidate
            onSubmit={handleSubmit(accountLogin)}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="input-email"
                className="text-zinc-950 text-base font-semibold pl-2"
              >
                Email
              </label>
              <input
                type="email"
                id="input-email"
                placeholder="Digite seu email"
                {...register("email")}
                className=" w-full h-12 bg-zinc-50 border rounded-2xl px-5 py-3 placeholder:text-base placeholder:text-zinc-500"
              />
              {errors.email && (
                <p className="text-sm text-red-600 pl-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="input-password"
                className="text-zinc-950 text-base font-semibold pl-2"
              >
                Senha
              </label>
              <input
                type="password"
                id="input-password"
                placeholder="Digite sua senha"
                {...register("password")}
                className=" w-full h-12 bg-zinc-50 border rounded-2xl px-5 py-3 placeholder:text-base placeholder:text-zinc-500"
              />
              {errors.password && (
                <p className="text-sm text-red-600 pl-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-14 mt-3 bg-teal-400 hover:bg-teal-300 disabled:bg-teal-600 disabled:text-zinc-500  rounded-md text-xl text-zinc-950  font-bold transition-all duration-500"
            >
              Login
            </button>
            <p className="text-base text-zinc-800 font-semibold text-center leading-5">
              Ainda não tem conta?{" "}
              <Link
                className="text-teal-700  hover:text-teal-600 hover:underline transition-all duration-500 "
                href={"/register"}
              >
                Cadastre-se
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
