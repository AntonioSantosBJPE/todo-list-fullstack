import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive().int(),
  name: z
    .string()
    .min(3, "O nome precisa ter ao menos 3 caracteres")
    .max(150, "O nome precisa ter no máximo 150 caracteres"),
  email: z
    .string()
    .email("Formato de email inválido")
    .max(45, "O email pode ter no máximo 45 carecteres"),
  password: z.string().min(8).max(32),
  avatar: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
});

export const userRegisterSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  isDeleted: true,
});

export const userReturnSchema = userSchema.omit({
  password: true,
  isDeleted: true,
});
