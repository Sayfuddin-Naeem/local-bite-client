import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";
import { backEndLogin } from "./useBackendLogIn";

export const useSignUp = () => {
  const { auth } = useAuth();
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const userCredential = await createUserWithEmailAndPassword(
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
