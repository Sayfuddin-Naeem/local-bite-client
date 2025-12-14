import { useApiMutation } from "../useApiMutation";

export const useDeleteReview = () => {
  return useApiMutation({
    method: "DELETE",
    isPrivate: true,
  });
};
