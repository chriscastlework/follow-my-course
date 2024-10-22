import Image from "next/image";
import { notFound } from "next/navigation";

type PageProps = {
  handle: string;
  missionStatement: string;
  imageUrl: string;
  courses: Course[] | null;
  ebooks: Ebook[] | null;
};

const CreatorPage = async ({ params }: { params: { handle: string } }) => {
  const creatorData = await fetchCreatorData(params.handle);

  if (!creatorData) {
    return notFound();
  }

  return (
    <BaseLayout renderRightPanel={false} renderSidePanel={false}>
      <StoreRedirectUrl redirectUrl={`/${params.handle}`} />
      <div className="container mx-auto py-12 px-4">
        <div className="mx-auto w-64 h-64 rounded-full overflow-hidden">
          <Image
            src={creatorData.imageUrl}
            alt={`${params.handle}'s profile picture`}
            width={250}
            height={250}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Creator Image and Handle */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mt-4">{params.handle}</h1>
        </div>

        {/* Mission Statement */}
        <div className="text-center mb-12">
          <p className="text-xl italic">Hardcoded mission statement</p>
        </div>

        <CreatorSubscriptionPricing />

        {/* Free Courses */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            eBooks course
          </h2>
          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto auto-rows-fr lg:grid-cols-1 lg:max-w-full">
            {creatorData?.ebooks?.length ? (
              creatorData.ebooks.map((course) =>
                course ? <CourseCard key={course.id} course={course} /> : null
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
            {creatorData?.courses?.length ? (
              creatorData.courses.map((course) =>
                course ? <CourseCard key={course.id} course={course} /> : null
              )
            ) : (
              <p>No courses available.</p>
            )}
          </div>
        </section>
      </div>
    </BaseLayout>
  );
};

export default CreatorPage;

// Example of mock data fetching function, you would replace this with your actual data fetching.
import prisma from "@/db/prisma";
import BaseLayout from "@/components/layout/BaseLayout";
import StoreRedirectUrl from "@/components/StoreRedirectUrl";
import CourseCard from "@/components/CourseCard";
import { Course, Ebook } from "@prisma/client";
import { CreatorSubscriptionPricing } from "../../components/CreatorSubscriptionPricing";

async function fetchCreatorData(handle: string): Promise<PageProps | null> {
  // Fetch user data from the database
  const user = await prisma.user.findUnique({
    where: { handle: handle },
    select: {
      id: true,
      handle: true,
      image: true,
      createdCourses: true,
      createdEbooks: true,
    },
  });

  if (!user) {
    return null;
  }

  // Merge user data with dummy course data
  const mergedData: PageProps = {
    handle: user.handle!,
    imageUrl: user.image || "/default-profile-picture.jpg",
    missionStatement: "No mission statement provided.",
    courses: user.createdCourses,
    ebooks: user.createdEbooks,
  };

  return mergedData;
}
