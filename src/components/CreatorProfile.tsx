"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { CreatorSubscriptionPricing } from "./CreatorSubscriptionPricing";
import { clientGetCreator } from "@/lib/clientActions/getUserAction";

const CreatorProfile = ({ handle }: { handle: string }) => {
  const { data: creatorData } = useQuery<{
    handle: string;
    image: string;
    missionStatement: string;
  }>({
    queryKey: ["creatorData"],
    queryFn: () => clientGetCreator(handle),
  });

  if (!creatorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mx-auto w-64 h-64 rounded-full overflow-hidden">
        <Image
          src={creatorData?.image}
          alt={`${creatorData?.handle}'s profile picture`}
          width={250}
          height={250}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Creator Image and Handle */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mt-4">{creatorData.handle}</h1>
      </div>

      {/* Mission Statement */}
      <div className="text-center mb-12">
        <p className="text-xl italic">{creatorData.missionStatement}</p>
      </div>

      <CreatorSubscriptionPricing />
    </div>
  );
};

export default CreatorProfile;
