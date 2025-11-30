import { useApiMutation } from "../../react-query/useApiMutation";

export const useUpdateComment = (commentId) => {
  return useApiMutation({
    method: "PATCH",
    url: `/comment/${commentId}`,
    isPrivate: true,
  });
};
