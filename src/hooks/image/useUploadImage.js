import { useApiMutation } from "../useApiMutation";

export const useUploadImage = () => {
  return useApiMutation({
    method: "POST",
    url: "/uploads/image",
    isPrivate: false,
  });
};
