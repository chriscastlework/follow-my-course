"use server";

import prisma from "@/db/prisma";

export async function searchAction(query: string) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { handle: { contains: query, mode: "insensitive" } },
        // { tags: { hasSome: [query] } },
      ],
    },
    select: {
      id: true,
      name: true,
      handle: true,
      //   tags: true,
    },
  });

  const courses = await prisma.course.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        // { tags: { hasSome: [query] } },
      ],
    },
    select: {
      id: true,
      title: true,
      //   tags: true,
    },
  });

  const ebooks = await prisma.ebook.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        // { tags: { hasSome: [query] } },
      ],
    },
    select: {
      id: true,
      title: true,
      //   tags: true,
    },
  });

  return { users, courses, ebooks };
}
