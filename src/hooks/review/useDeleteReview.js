import { useApiMutation } from "../useApiMutation";

export const useDeleteReview = () => {
  return useApiMutation({
    method: "delete",
    isPrivate: true,
  });
};
