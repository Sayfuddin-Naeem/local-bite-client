import { useApiMutation } from "../useApiMutation";

export const useCreateReview = () => {
  return useApiMutation({
    method: "post",
    url: "/reviews",
    isPrivate: true,
  });
};
