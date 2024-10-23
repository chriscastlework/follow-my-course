import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "@prisma/client";

export async function getUserById(id: string): Promise<User | null> {
  return await prisma.user.findUnique({ where: { id } });
}

export async function getCurrentUser(): Promise<User | null> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // if user is authenticated and it does not find the user is should create the user here

  return await prisma.user.findUnique({ where: { id: user.id } });
}
