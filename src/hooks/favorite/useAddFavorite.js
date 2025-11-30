import { useApiMutation } from "../useApiMutation";

export const useAddFavorite = () => {
  return useApiMutation({
    method: "POST",
    url: "/favorites",
    isPrivate: true,
  });
};
