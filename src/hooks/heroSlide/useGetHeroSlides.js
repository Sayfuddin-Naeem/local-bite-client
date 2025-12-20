import { useApiGet } from "../useApiGet";

export const useGetHeroSlides = () => {
  const url = "/hero-slides";

  return useApiGet({
    key: "hero-slides",
    url,
    isPrivate: false,
  });
};
