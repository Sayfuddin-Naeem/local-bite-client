import { useApiMutation } from "../useApiMutation";

export const useCreateComment = () => {
  return useApiMutation({
    method: "POST",
    url: "/comments",
    isPrivate: true,
  });
};
