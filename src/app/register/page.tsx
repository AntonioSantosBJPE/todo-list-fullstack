"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
    <main>
      <h1>Pagina de registro</h1>
      <div>
        <Link href={"/"}>Voltar para home</Link>
        <br></br>
        <Link href={"/login"}>Login</Link>
      </div>

      <form noValidate onSubmit={handleSubmit(accountRegister)}>
        <div>
          <label htmlFor="input-name">Nome</label>
          <input
            type="text"
            id="input-name"
            placeholder="Digite seu nome"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
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
        <div>
          <label htmlFor="input-confirmPassword">Confirme sua senha</label>
          <input
            type="password"
            id="input-confirmPassword"
            placeholder="Confirme sua senha"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Registrar</button>
      </form>
    </main>
  );
};
export default Register;
