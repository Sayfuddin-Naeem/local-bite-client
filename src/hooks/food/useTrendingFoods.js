import { useApiGet } from "../useApiGet";

export const useTrendingFoods = ({ page = 1, limit = 10, type = "top-rated" }) => {
  const url = `/foods/trending?page=${page}&limit=${limit}&type=${type}`;

  return useApiGet({
    key: "trending-foods",
    url,
    isPrivate: false,
  });
};
