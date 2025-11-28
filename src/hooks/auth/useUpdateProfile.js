import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";

export const useUpdateProfile = () => {
  const { auth } = useAuth();

  return useMutation({
    mutationFn: async ({ displayName, photoURL }) => {
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }

      return await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });
    },
  });
};
