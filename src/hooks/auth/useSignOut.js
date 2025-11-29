import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { axiosPrivate } from "../../api/axiosPrivate";
import { useAuth } from "../../providers/AuthProvider";

export const useSignOut = () => {
  const { auth } = useAuth();
  return useMutation({
    mutationFn: async () => {
      await axiosPrivate.post("/auth/logout");
      await signOut(auth);
    },
  });
};
