import { useApiMutation } from "../useApiMutation";

export const useUpdateReview = (id) => {
  return useApiMutation({
    method: "patch",
    url: `/reviews/${id}`,
    isPrivate: true,
  });
};
