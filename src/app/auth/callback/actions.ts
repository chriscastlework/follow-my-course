import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function checkAuthStatus() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return { success: false };

  let existingUser = await prisma.user.findUnique({ where: { id: user.id } });

  // sign up
  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email!,
        name: user.given_name + " " + user.family_name,
        image: user.picture,
        isCreator: false,
      },
    });

    existingUser = await prisma.user.findUnique({ where: { id: user.id } });
  }

  const isCreator = existingUser?.isCreator || false;

  return { success: true, user: existingUser, isCreator: isCreator };
}
