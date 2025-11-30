import { useApiGet } from "../useApiGet";

export const useReviewById = (id) => {
  return useApiGet({
    key: "review-by-id",
    url: `/reviews/${id}`,
    isPrivate: false,
    enabled: !!id,
  });
};
