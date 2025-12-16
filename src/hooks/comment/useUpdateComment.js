import { useApiMutation } from "../useApiMutation";

export const useUpdateComment = () => {
  return useApiMutation({
    method: "PATCH",
    isPrivate: true,
  });
};
