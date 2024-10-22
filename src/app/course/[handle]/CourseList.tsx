import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Course } from "@prisma/client";

export default function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <div className="grid gap-4">
          {courses.map((course) => (
            // <Card key={course.id}>
            //   <CardHeader>
            //     <CardTitle>{course.title}</CardTitle>
            //   </CardHeader>
            //   <CardContent>
            //     <p className="text-sm text-gray-600">{course.description}</p>
            //     <Link
            //       href={`/courses/${course.id}`}
            //       className="text-blue-500 hover:underline mt-2 inline-block"
            //     >
            //       View Course
            //     </Link>
            //   </CardContent>
            // </Card>
            <div className="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
              <img
                src="https://source.unsplash.com/random/300x300/?1"
                alt=""
                className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
              />
              <div className="mt-6 mb-2">
                <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">
                  Quisque
                </span>
                <h2 className="text-xl font-semibold tracking-wide">
                  Nam maximus purus
                </h2>
              </div>
              <p className="dark:text-gray-800">
                Mauris et lorem at elit tristique dignissim et ullamcorper elit.
                In sed feugiat mi. Etiam ut lacinia dui.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
