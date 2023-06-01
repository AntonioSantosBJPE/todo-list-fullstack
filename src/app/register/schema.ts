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
    password: z.string().min(8).max(32),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senha precisam ser iguais",
    path: ["confirmPassword"],
  });
export type TregisterUser = z.infer<typeof schema>;
