import { useApiMutation } from "../../react-query/useApiMutation";

export const useDeleteComment = (commentId) => {
  return useApiMutation({
    method: "DELETE",
    url: `/comment/${commentId}`,
    isPrivate: true,
  });
};
