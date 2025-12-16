import { useApiMutation } from "../useApiMutation";

export const useDeleteComment = () => {
  return useApiMutation({
    method: "DELETE",
    isPrivate: true,
  });
};
