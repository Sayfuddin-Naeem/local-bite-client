import { useApiMutation } from "../useApiMutation";

export const useUpdateComment = (commentId) => {
  return useApiMutation({
    method: "PATCH",
    url: `/comments/${commentId}`,
    isPrivate: true,
  });
};
