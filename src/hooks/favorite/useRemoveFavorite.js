import { useApiMutation } from "../useApiMutation";

export const useRemoveFavorite = (reviewId) => {
  return useApiMutation({
    method: "DELETE",
    url: `/favorites/${reviewId}`,
    isPrivate: true,
    enabled: !!reviewId,
  });
};
