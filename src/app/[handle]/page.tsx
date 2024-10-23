import CourseCard from "@/components/CourseCard";
import CreatorProfile from "@/components/CreatorProfile";
import BaseLayout from "@/components/layout/BaseLayout";
import StoreRedirectUrl from "@/components/StoreRedirectUrl";
import { getCreatorDataByHandle as getCreatorByHandle } from "@/lib/data/user";
import { Course, Ebook, User } from "@prisma/client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";

type PageProps = {
  handle: string;
  missionStatement: string;
  imageUrl: string;
  courses: Course[] | null;
  ebooks: Ebook[] | null;
};

const CreatorPage = async ({ params }: { params: { handle: string } }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["creatorData"],
    queryFn: () => getCreatorByHandle(params.handle),
  });

  const creatorData = await getCreatorByHandle(params.handle);

  if (!creatorData) {
    return notFound();
  }

  return (
    <BaseLayout renderRightPanel={false} renderSidePanel={false}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StoreRedirectUrl redirectUrl={`/${params.handle}`} />
        <CreatorProfile handle={params.handle} />
      </HydrationBoundary>
      {/* Free Courses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          eBooks course
        </h2>
        <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-1 lg:max-w-full">
          {creatorData?.createdEbooks?.length ? (
            creatorData.createdEbooks.map((ebook) =>
              ebook ? <CourseCard key={ebook.id} course={ebook} /> : null
            )
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </section>

      {/* Paid Courses */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Video Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatorData?.createdCourses?.length ? (
            creatorData.createdCourses.map((course) =>
              course ? <CourseCard key={course.id} course={course} /> : null
            )
          ) : (
            <p>No courses available.</p>
          )}
        </div>
      </section>
    </BaseLayout>
  );
};

export default CreatorPage;
