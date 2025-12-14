import { useApiGet } from "../useApiGet";

export const useUserFavorites = ({ userId, page = 1, limit = 6 }) => {
  const url = `/favorites/user/${userId}?page=${page}&limit=${limit}`;
  return useApiGet({
    key: ["user-favorites", userId, page, limit],
    url,
    isPrivate: true,
  });
};
