import { useApiMutation } from "../../react-query/useApiMutation";

export const useCreateComment = () => {
  return useApiMutation({
    method: "POST",
    url: "/comment",
    isPrivate: true,
  });
};
