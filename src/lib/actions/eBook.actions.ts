import { z } from "zod";
import { eBookFormSchema } from "../validations";
import { Ebook } from "@prisma/client";
import { users } from "../appWriteConfig";
import { ID } from "node-appwrite";

export const createEBook = async (eBook: z.infer<typeof eBookFormSchema>) => {
  console.log(JSON.stringify(eBook));
  // back end validation
  const validatedData = eBookFormSchema.safeParse(eBook);
  if (!validatedData.success) {
    throw new Error("Invalid data");
  }

  try {
    const result = await users.create(
      ID.unique(), // userId
      "email@example.com", // email (optional)
      "+12065550100", // phone (optional)
      "", // password (optional)
      eBook.name // name (optional)
    );
  } catch (error) {
    console.error("Failed to create ebook", error);
  }

  return null;
};
