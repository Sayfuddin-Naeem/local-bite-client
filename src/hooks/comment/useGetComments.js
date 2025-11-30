import { useApiGet } from "../../react-query/useApiGet";

export const useGetComments = ({ reviewId, page = 1, limit = 10 }) => {
  return useApiGet({
    key: "comments",
    url: `/comment/review/${reviewId}?page=${page}&limit=${limit}`,
    enabled: !!reviewId,
    isPrivate: false,
  });
};
