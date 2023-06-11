import { z } from "zod";
import {
  userRegisterSchema,
  userReturnSchema,
  userUpdateSchema,
} from "./schema";

export type TuserCreateRequest = z.infer<typeof userRegisterSchema>;
export type TuserReturn = z.infer<typeof userReturnSchema>;
export type TuserUpdateRequest = z.infer<typeof userUpdateSchema>;
