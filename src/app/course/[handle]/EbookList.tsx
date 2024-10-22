import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ebook } from "@prisma/client";

export default function EbookList({ ebooks }: { ebooks: Ebook[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Ebooks</h2>
      {ebooks.length === 0 ? (
        <p>No ebooks available.</p>
      ) : (
        <div className="grid gap-4">
          {ebooks.map((ebook) => (
            <Card key={ebook.id}>
              <CardHeader>
                <CardTitle>{ebook.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{ebook.description}</p>
                <Link
                  href={`/ebooks/${ebook.id}`}
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Ebook
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
