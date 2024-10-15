// pages/courses/index.tsx
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getMyCourseAction } from './actions';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/db/prisma';
import BaseLayout from '@/components/BaseLayout';

const CoursesList = async() => {

   
    const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) throw new Error("Unauthorized");

    const courses = await prisma.course.findMany({ where: { userId: user.id } });
    


  return (
          <BaseLayout renderRightPanel={false}>
      <h1>Courses List</h1>
      <Link href="/courses/new">
        <button>Add New Course</button>
      </Link>
              <ul>
                  {courses?.map((course) => (
                      <li key={course.id}>
                          <h2>{course.title}</h2>
                          <p>{course.description}</p>
                          <p>Price (Year): ${course.priceYear}</p>
                          <p>Price (Month): ${course.priceMonth}</p>
                      </li>
                  ))}
              </ul>

                  </BaseLayout>
  );
};

export default CoursesList;
