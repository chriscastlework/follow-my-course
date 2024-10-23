"use server";

import { z } from "zod";
import { eBookFormSchema } from "../validations";
import { users } from "../appWriteConfig";
import { ID } from "node-appwrite";

export const createEBookWithValidation = async (eBook: any) => {
  console.log(
    "create ebook action running on server with validation",
    JSON.stringify(eBook)
  );
  //wait 1 second
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
    return result;
  } catch (error) {
    console.error("Failed to create ebook", error);
  }

  return null;
};

// this function all works, but i want the validation to be done on the server side
export const createEBook = async ({ name }: { name: string }) => {
  console.log("create ebook action is running on server?");

  try {
    const result = await users.create(
      ID.unique(), // userId
      "email2@example.com", // email (optional)
      "+12065550102", // phone (optional)
      "amesing980", // password (optional)
      name // name (optional)
    );
  } catch (error) {
    console.error("Failed to create ebook", error);
  }

  return null;
};
