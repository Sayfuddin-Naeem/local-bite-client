import { useApiGet } from "../useApiGet";

export const useGetFavorite = ({ userId, reviewId }) => {
  const url = `/favorites?userId=${userId}&reviewId=${reviewId}`;
  return useApiGet({
    key: ["favorite", userId, reviewId],
    url,
    isPrivate: true,
    enabled: !!userId && !!reviewId,
  });
};
