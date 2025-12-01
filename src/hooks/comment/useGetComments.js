import { useApiGet } from "../useApiGet";

export const useGetComments = ({ reviewId, page = 1, limit = 10 }) => {
  return useApiGet({
    key: "comments",
    url: `/comments/review/${reviewId}?page=${page}&limit=${limit}`,
    enabled: !!reviewId,
    isPrivate: false,
  });
};
