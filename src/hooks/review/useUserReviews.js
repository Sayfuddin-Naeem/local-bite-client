import { useApiGet } from "../useApiGet";

export const useUserReviews = ({ userId, page = 1, limit = 6 }) => {
  const url = `/reviews/user/${userId}?page=${page}&limit=${limit}`;

  return useApiGet({
    key: ["user-reviews", userId, page, limit],
    url,
    isPrivate: true,
    enabled: !!userId,
  });
};
