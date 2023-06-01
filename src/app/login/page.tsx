"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
    <main>
      <h1>Pagina de Login</h1>
      <div>
        <Link href={"/"}>Voltar para home</Link>
        <br></br>
        <Link href={"/register"}>Registro</Link>
      </div>

      <form noValidate onSubmit={handleSubmit(accountLogin)}>
        <div>
          <label htmlFor="input-email">Email</label>
          <input
            type="email"
            id="input-email"
            placeholder="Digite seu email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="input-password">Senha</label>
          <input
            type="password"
            id="input-password"
            placeholder="Digite sua senha"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;
