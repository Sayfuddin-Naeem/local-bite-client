import { useApiMutation } from "../useApiMutation";

export const useDeleteComment = (commentId) => {
  return useApiMutation({
    method: "DELETE",
    url: `/comments/${commentId}`,
    isPrivate: true,
  });
};
