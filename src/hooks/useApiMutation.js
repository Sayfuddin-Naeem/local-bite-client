import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axiosPrivate";
import { axiosPublic } from "../api/axiosPublic";

export const useApiMutation = ({ method, url, isPrivate = false }) => {
  const client = isPrivate ? axiosPrivate : axiosPublic;

  return useMutation({
    mutationFn: async ({body, headers}) => {
      const res = await client({
        method,
        url,
        data: body,
        headers,
      });
      return res.data;
    },
  });
};