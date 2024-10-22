import UserProfile from "./UserProfile";
import Posts from "./Posts";
import prisma from "@/db/prisma";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { notFound } from "next/navigation";
import BaseLayout from "@/components/layout/BaseLayout";

const HomeScreen = async () => {
  const admin = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  const user = await getUserProfileAction();

  if (!user) return notFound();

  return (
    <BaseLayout>
      <UserProfile />
      <Posts admin={admin!} isSubscribed={true} />
    </BaseLayout>
  );
};
export default HomeScreen;
