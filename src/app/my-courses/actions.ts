'use server';


import prisma from "@/db/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function getMyCourseAction() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

    const courses = await prisma.course.findMany({ where: { userId: user.id } });

	return courses;
}
