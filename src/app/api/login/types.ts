import { z } from "zod";
import { loginSchema } from "./schema";

export type TloginRequest = z.infer<typeof loginSchema>;
