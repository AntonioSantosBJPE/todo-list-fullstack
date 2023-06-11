import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().positive().int(),
  title: z
    .string()
    .max(100, "O título pode conter no máximo 100 carecteres")
    .nonempty("O título da task precisa conter ao menos um caracter"),
  isFinished: z.boolean(),
  createdAt: z.date(),
});

export const taskCreateSchema = taskSchema.omit({
  createdAt: true,
  id: true,
  isFinished: true,
});

export const taskUpdateSchema = taskSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .partial();
