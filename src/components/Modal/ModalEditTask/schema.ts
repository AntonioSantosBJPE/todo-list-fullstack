import { z } from "zod";
export const schema = z.object({
  title: z
    .string()
    .nonempty("O título da task precisa conter ao menos um caracter"),
});
export type TeditTask = z.infer<typeof schema>;
