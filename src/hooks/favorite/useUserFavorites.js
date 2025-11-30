import { useApiGet } from "../useApiGet";

export const useUserFavorites = () => {
  return useApiGet({
    key: "user-favorites",
    url: "/favorites",
    isPrivate: true,
  });
};
