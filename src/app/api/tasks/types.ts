import { z } from "zod";
import { taskCreateSchema, taskUpdateSchema } from "./schema";

export type TtaskCreateRequest = z.infer<typeof taskCreateSchema>;
export type TtaskUpdateRequest = z.infer<typeof taskUpdateSchema>;
