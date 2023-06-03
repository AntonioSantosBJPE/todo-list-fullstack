"use client";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";
import { AuthContext } from "@/contexts/AuthContext";
import { IloginUser, IuserAuth } from "@/contexts/types";
import { api } from "@/database/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { schema, TloginUser } from "./schema";

export const FormLogin = () => {
  const { udpateuserAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TloginUser>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const accountLogin = async ({ email, password }: TloginUser) => {
    try {
      setIsLoading(true);
      const outputLogin = await api.post<IloginUser>("/api/login", {
        email,
        password,
      });

      const { accessToken } = outputLogin.data;
      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      setCookie(undefined, "@todo-list:token", accessToken, {
        maxAge: 60 * 60 * 1,
      });
      const responseProfile = await api.get<IuserAuth>("/api/profile");
      udpateuserAuth(responseProfile.data);

      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <form
      noValidate
      onSubmit={handleSubmit(accountLogin)}
      className="w-full max-w-sm flex flex-col gap-4"
    >
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

      <button
        type="submit"
        className="w-full h-14 mt-3 bg-teal-400 hover:bg-teal-300 disabled:bg-teal-600 disabled:text-zinc-500  rounded-md text-xl text-zinc-950  font-bold transition-all duration-500"
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Login"}
      </button>
      <div className=" flex flex-col gap-1 w-full">
        <p className="text-base text-zinc-800 font-semibold text-center leading-5">
          Ainda não tem conta?{" "}
          <Link
            className="text-teal-700  hover:text-teal-600 hover:underline transition-all duration-500 "
            href={"/register"}
          >
            Cadastre-se
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
  );
};
