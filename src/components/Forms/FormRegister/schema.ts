import { z } from "zod";
export const schema = z
  .object({
    name: z
      .string()
      .min(3, "O nome precisa ter ao menos 3 caracteres")
      .max(150, "O nome precisa ter no máximo 150 caracteres"),
    email: z
      .string()
      .email("Formato de email inválido")
      .max(45, "O email pode ter no máximo 45 carecteres"),
    password: z
      .string()
      .min(8, "A senha precisa conter ao menos 8 caracteres")
      .max(32, "A senha precisa pode conter no máximo 32 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });
export type TregisterUser = z.infer<typeof schema>;
