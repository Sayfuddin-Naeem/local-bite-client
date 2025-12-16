import { useApiGet } from "../useApiGet";

export const useGetComments = ({ reviewId, page = 1, limit = 10 }) => {
  const url = `/comments/review/${reviewId}?page=${page}&limit=${limit}`;
  return useApiGet({
    key: ["comments", reviewId, page, limit],
    url,
    isPrivate: false,
    enabled: !!reviewId,
  });
};
