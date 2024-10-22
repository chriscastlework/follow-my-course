import { Suspense } from "react";
import BaseLayout from "@/components/layout/BaseLayout";
import { SearchForm } from "./components/SearchForm";
import { SearchResults } from "./components/SearchResults";

export default function ExplorePage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <BaseLayout renderRightPanel={false}>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Explore</h1>
        <SearchForm />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </BaseLayout>
  );
}
