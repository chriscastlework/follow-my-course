import Link from "next/link";
import { searchAction } from "../actions/actions";

export async function SearchResults({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  const results = await searchAction(query);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
      {results.users.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Users</h3>
          <ul>
            {results.users.map((user) => (
              <li key={user.id} className="mb-2">
                <Link
                  href={`/${user.handle}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.name}
                </Link>
                {/* <p className="text-sm text-gray-600">{user.tags.join(", ")}</p> */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.courses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Courses</h3>
          <ul>
            {results.courses.map((course) => (
              <li key={course.id} className="mb-2">
                <Link
                  href={`/courses/${course.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {course.title}
                </Link>
                <p className="text-sm text-gray-600">
                  {/* {course.tags.join(", ")} */}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.ebooks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Ebooks</h3>
          <ul>
            {results.ebooks.map((ebook) => (
              <li key={ebook.id} className="mb-2">
                <Link
                  href={`/ebooks/${ebook.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {ebook.title}
                </Link>
                {/* <p className="text-sm text-gray-600">{ebook.tags.join(", ")}</p> */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.users.length === 0 &&
        results.courses.length === 0 &&
        results.ebooks.length === 0 && <p>No results found.</p>}
    </div>
  );
}
