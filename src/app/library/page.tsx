import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useServerUser } from "@/serverHooks/useServerUser";
import { Ebook } from "@prisma/client";
import { listEbooks } from "@/servers/ebooks";
import BaseLayout from "@/components/layout/BaseLayout";

const Page = async () => {
  const user = await useServerUser();
  const ebooks = await listEbooks(user?.id);

  return (
    <BaseLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Ebooks</h2>
        {ebooks.length === 0 ? (
          <p>No ebooks found.</p>
        ) : (
          <div className="grid gap-4">
            {ebooks.map((ebook) => (
              <Card key={ebook.id}>
                <CardHeader>
                  <CardTitle>{ebook.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{ebook.description}</p>
                  <p>Price: ${(ebook.price / 100).toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

export default Page;
