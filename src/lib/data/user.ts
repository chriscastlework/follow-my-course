import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { User } from "@prisma/client";

export async function getUserById(id: string): Promise<User | null> {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  return await prisma.user.findUnique({ where: { id } });
}

export const getUserByHandle = async (handle: string): Promise<User | null> => {
  console.log("get user by handle", handle);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !handle) {
    return null;
  }

  return await prisma.user.findUnique({ where: { handle } });
};

export const getCurrentUser = async (): Promise<User | null> => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  return await prisma.user.findUnique({ where: { id: user.id } });
};

export const getCreatorDataByHandle = async (handle: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null;
  }

  const creator = await prisma.user.findUnique({
    where: { handle: handle },
    select: {
      id: true,
      handle: true,
      image: true,
      createdCourses: true,
      createdEbooks: true,
    },
  });

  if (!creator) {
    return null;
  }

  return creator;
};
