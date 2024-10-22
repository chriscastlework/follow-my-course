import { notFound } from "next/navigation";
import prisma from "@/db/prisma";
import BaseLayout from "@/components/layout/BaseLayout";
import { useServerUser } from "@/serverHooks/useServerUser";
import CourseList from "./CourseList";
import EbookList from "./EbookList";

export default async function CreatorPage({
  params,
}: {
  params: { handle: string };
}) {
  const user = await useServerUser();

  const creator = await prisma.user.findUnique({
    where: { handle: params.handle },
    include: {
      createdCourses: true,
      createdEbooks: true,
    },
  });

  if (!creator) {
    return notFound();
  }

  return (
    <BaseLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">
          {creator.name}'s Courses and Ebooks
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <CourseList courses={creator.createdCourses} />
            <EbookList ebooks={creator.createdEbooks} />
          </div>
          <div>
            {/* <SubscriptionStatus
              subscription={subscription}
              creatorId={creator.id}
            /> */}
            {/* <PurchaseHistory purchases={purchases} /> */}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
