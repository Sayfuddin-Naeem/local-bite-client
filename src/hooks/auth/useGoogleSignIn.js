import { useMutation } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";

export const useGoogleSignIn = () => {
  const { auth } = useAuth();
  const googleProvider = new GoogleAuthProvider();

  return useMutation({
    mutationFn: async () => {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    },
  });
};
