import { useApiGet } from "../useApiGet";

export const useAllReviews = ({ page = 1, limit = 6, search = "" }) => {
  const url = `/reviews?page=${page}&limit=${limit}&search=${search}`;

  return useApiGet({
    key: ["all-reviews", page, limit, search],
    url,
    isPrivate: false,
  });
};
