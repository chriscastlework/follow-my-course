import ProductCard from "@/components/ProductCard";
import UnderlinedText from "@/components/decorators/UnderlinedText";
import prisma from "@/db/prisma";
import { CheckAuth } from "@/lib/checkAuth";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { useUser } from "@/lib/useUser";
import BaseLayout from "@/components/layout/BaseLayout";

const Page = async () => {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";

  await CheckAuth(header_url);

  const products = await prisma.product.findMany({
    where: {
      isArchived: false,
    },
  });

  return (
    <BaseLayout renderRightPanel={false}>
      <div className="px-3 md:px-10 my-10">
        <h1 className="text-3xl text-center my-5 font-bold tracking-tight">
          Our{" "}
          <UnderlinedText className="decoration-wavy">Products</UnderlinedText>
        </h1>

        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </BaseLayout>
  );
};
export default Page;
