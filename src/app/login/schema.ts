import { z } from "zod";
export const schema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string(),
});
export type TloginUser = z.infer<typeof schema>;
