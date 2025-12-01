import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";

export const useSignIn = () => {
  const { auth } = useAuth();
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential.user;
    },
  });
};
