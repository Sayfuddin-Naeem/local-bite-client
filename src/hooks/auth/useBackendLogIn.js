import { axiosPublic } from "../../api/axiosPublic";

export const backEndLogin = async (firebaseUser) => {
  if (!firebaseUser) {
    throw new Error("Firebase user missing !");
  }
  
  const idToken = await firebaseUser.getIdToken();
  const res = await axiosPublic.post(
    "/auth/login",
    {},
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  // console.log(res.data);
  return res.data.user;
};
