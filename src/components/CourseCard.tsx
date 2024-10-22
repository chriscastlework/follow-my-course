import { Course } from "@prisma/client";
import React from "react";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="flex flex-col overflow-hidden border-2 rounded-md dark:border-gray-300">
      <img
        src="https://source.unsplash.com/random/300x300/?1"
        alt=""
        className="object-cover object-center w-full rounded-md h-72"
      />
      <div className="mt-6 mb-2">
        <span className="block text-xs font-medium tracking-widest uppercase">
          {course.price ? `$${course.price}` : "Free"}
        </span>
        <h2 className="text-xl font-semibold tracking-wide">{course.title}</h2>
      </div>
      <p className="dark:text-gray-800">
        {course.description || "No description available."}
      </p>
    </div>
  );
};

export default CourseCard;
