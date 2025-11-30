import { useApiMutation } from "../useApiMutation";

export const useUpdateUser = (id) => {
  return useApiMutation({
    method: "PATCH",
    url: `/users/${id}`,
    isPrivate: true,
  });
};
