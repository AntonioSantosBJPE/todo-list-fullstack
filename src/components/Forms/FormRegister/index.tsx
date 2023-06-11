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
import { schema, TregisterUser } from "./schema";

export const FormRegister = () => {
  const { udpateuserAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TregisterUser>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const accountRegister = async ({
    name,
    email,
    password,
    confirmPassword,
  }: TregisterUser) => {
    try {
      setIsLoading(true);
      const response = await api.post<IuserAuth>("/api/users", {
        name,
        email,
        password,
      });
      const responseLogin = await api.post<IloginUser>("/api/login", {
        email,
        password,
      });
      udpateuserAuth(response.data);
      const { accessToken } = responseLogin.data;
      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      setCookie(undefined, "@todo-list:token", accessToken, {
        maxAge: 60 * 60 * 1,
      });

      router.push("/dashboard");
    } catch (error: any) {
      setIsLoading(false);
    }
  };
  return (
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
        disabled={isLoading}
      >
        {isLoading ? <Spinner /> : "Registrar"}
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
  );
};
