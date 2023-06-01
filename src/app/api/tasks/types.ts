import { z } from "zod";
import { taskCreateSchema } from "./schema";

export type TtaskCreateRequest = z.infer<typeof taskCreateSchema>;
