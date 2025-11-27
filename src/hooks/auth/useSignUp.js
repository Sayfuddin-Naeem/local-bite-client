import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";

export const useSignUp = () => {
    const { auth } = useAuth();
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    },
  });
};
