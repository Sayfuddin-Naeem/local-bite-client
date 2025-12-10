import { axiosPrivate } from "../../api/axiosPrivate";

export const loadBackendUser = async (fbUser) => {
    if (!fbUser?.uid) return;

    const res = await axiosPrivate.get(`/users/${fbUser.uid}`);
    return res.data;
  };
