import { useApiMutation } from "../useApiMutation";

export const useRemoveFavorite = () => {
  return useApiMutation({
    method: "DELETE",
    isPrivate: true,
  });
};
