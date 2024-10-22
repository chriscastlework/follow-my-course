import BaseLayout from "@/components/layout/BaseLayout";
import React from "react";

const Page = async ({
  params,
}: {
  params: {
    handel: string;
  };
}) => {
  return (
    <BaseLayout renderRightPanel={false}>
      <div> Course {params.handel} </div>
    </BaseLayout>
  );
};

export default Page;
