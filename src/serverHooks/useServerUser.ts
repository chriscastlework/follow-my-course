import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/db/prisma";

export const useServerUser = cache(async () => {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) {
    return null;
  }

  let user = await prisma.user.findUnique({
    where: { id: kindeUser.id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: kindeUser.id,
        email: kindeUser.email || "",
        name: kindeUser.given_name || "",
      },
    });
  }

  return user;
});
