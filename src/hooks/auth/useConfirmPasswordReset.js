import { useMutation } from "@tanstack/react-query";
import { checkActionCode, confirmPasswordReset } from "firebase/auth";
import { useAuth } from "../../providers/AuthProvider";

export const useConfirmPasswordReset = () => {
  const { auth } = useAuth();
  return useMutation({
    mutationFn: async ({ oobCode, newPassword }) => {
      await checkActionCode(auth, oobCode);
      return confirmPasswordReset(auth, oobCode, newPassword);
    },
  });
};
