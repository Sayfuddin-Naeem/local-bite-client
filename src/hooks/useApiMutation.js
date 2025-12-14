import { useMutation } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axiosPrivate";
import { axiosPublic } from "../api/axiosPublic";

export const useApiMutation = ({ method, url: baseUrl, isPrivate = false }) => {
  const client = isPrivate ? axiosPrivate : axiosPublic;

  return useMutation({
    mutationFn: async ({ body, headers = {}, url }) => {
      const res = await client({
        method,
        url: url || baseUrl,
        data: body,
        headers: { ...headers },
      });
      return res.data;
    },
  });
};
