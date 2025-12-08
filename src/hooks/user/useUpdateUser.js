import { useApiMutation } from "../useApiMutation";

export const useUpdateUser = (id) => {
  // if (!id) throw new Error("User ID is required for updating user");
  return useApiMutation({
    method: "PATCH",
    url: `/users/${id}`,
    isPrivate: true,
  });
};
