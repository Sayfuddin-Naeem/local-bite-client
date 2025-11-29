import { useMutation } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";
import { backEndLogin } from "./useBackendLogIn";

export const useGoogleSignIn = () => {
  const { auth } = useAuth();
  const googleProvider = new GoogleAuthProvider();

  return useMutation({
    mutationFn: async () => {
      const userCredential = await signInWithPopup(auth, googleProvider);
      
      const backendUser = await backEndLogin(userCredential?.user);

      return {
        fbUser: userCredential.user,
        dbUser: backendUser,
      };
    },
  });
};
