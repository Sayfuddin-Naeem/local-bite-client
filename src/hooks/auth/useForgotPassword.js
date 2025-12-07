import { useMutation } from "@tanstack/react-query";
import { sendPasswordResetEmail } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";

export const useForgotPassword = () => {
  const { auth } = useAuth();

  return useMutation({
    mutationFn: async (email) => {
      return sendPasswordResetEmail(auth, email);
    },
  });
};
