import { z } from "zod";

const eBookFormSchema = z.object({
  name: z.string().min(2).max(50),
  file: z.any(),
});

export { eBookFormSchema };
