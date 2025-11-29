import { useMutation } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";
import { backEndLogin } from "./useBackendLogIn";

export const useSignIn = () => {
  const { auth } = useAuth();
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const backendUser = await backEndLogin(userCredential?.user);

      return {
        fbUser: userCredential.user,
        dbUser: backendUser,
      };
    },
  });
};
