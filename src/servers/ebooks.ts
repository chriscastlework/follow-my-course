import prisma from "@/db/prisma";
import { Ebook } from "@prisma/client";

export async function createEbook(
  data: Omit<Ebook, "id" | "createdAt" | "updatedAt">
) {
  return prisma.ebook.create({
    data,
  });
}

export async function updateEbook(
  id: string,
  data: Partial<Omit<Ebook, "id" | "createdAt" | "updatedAt">>
) {
  return prisma.ebook.update({
    where: { id },
    data,
  });
}

export async function deleteEbook(id: string) {
  return prisma.ebook.delete({
    where: { id },
  });
}

export async function listEbooks(creatorId?: string) {
  return prisma.ebook.findMany({
    where: creatorId ? { creatorId } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function getEbookById(id: string) {
  return prisma.ebook.findUnique({
    where: { id },
  });
}
