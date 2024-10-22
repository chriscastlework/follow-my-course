import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const { getUser, isAuthenticated } = useKindeBrowserClient();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await getUser();
        if (!user) return null;

        const response = await fetch(`/api/getUser?id=${user.id}`);
        if (!response.ok) {
          throw new Error("Error fetching user from database");
        }

        const userData = await response.json();
        return userData;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
    enabled: isAuthenticated === true, // Only run the query when getUser is ready
    staleTime: 1000 * 60 * 5, // optional: cache data for 5 minutes
    refetchOnWindowFocus: false, // optional: avoid refetching on window focus
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
