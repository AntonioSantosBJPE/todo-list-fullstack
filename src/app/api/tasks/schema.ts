import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().positive().int(),
  title: z.string().max(100),
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
