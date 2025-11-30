// hooks/user/useCreateUser.js
import { useApiMutation } from "../useApiMutation";

export const useCreateUser = () => {
  return useApiMutation({
    method: "POST",
    url: "/users",
    isPrivate: false,
  });
};
