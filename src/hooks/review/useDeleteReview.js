import { useApiMutation } from "../useApiMutation";

export const useDeleteReview = (id) => {
  return useApiMutation({
    method: "delete",
    url: `/reviews/${id}`,
    isPrivate: true,
  });
};
