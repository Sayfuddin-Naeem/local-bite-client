import { useApiGet } from "../useApiGet";

export const useMostFavoriteReviews = ({ page = 1, limit = 6 }) => {
  const url = `/reviews/most-favorite?page=${page}&limit=${limit}`;

  return useApiGet({
    key: "most-favorite-reviews",
    url,
    isPrivate: false,
  });
};
