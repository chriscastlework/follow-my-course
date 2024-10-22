import { Course } from "@prisma/client";
import React from "react";

interface EBookCardProps {
  course: Course;
}

const CourseCard: React.FC<EBookCardProps> = ({ course }) => {
  return (
    <div className="max-w-xs p-6 rounded-md shadow-md">
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
