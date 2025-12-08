import { axiosPrivate } from "../../api/axiosPrivate";
import { useAuth } from "../../providers/AuthProvider";

export const useBackendUser = () => {
  const { fbUser, setDbUser } = useAuth();

  const loadBackendUser = async () => {
    if (!fbUser?.uid) return;

    const res = await axiosPrivate.get(`/users/${fbUser.uid}`);
    setDbUser(res.data);
    return res.data;
  };
  return { loadBackendUser };
};
