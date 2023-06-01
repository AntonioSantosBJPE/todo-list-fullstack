import { z } from "zod";
import { userRegisterSchema, userReturnSchema } from "./schema";

export type TuserCreateRequest = z.infer<typeof userRegisterSchema>;
export type TuserReturn = z.infer<typeof userReturnSchema>;
