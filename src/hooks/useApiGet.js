import { useQuery } from "@tanstack/react-query";
import { axiosPrivate } from "../api/axiosPrivate";
import { axiosPublic } from "../api/axiosPublic";

export const useApiGet = ({key, url, enabled = true, isPrivate = false}) => {
    const client = isPrivate ? axiosPrivate : axiosPublic;

    return useQuery({
        queryKey: [key, url],
        queryFn: async ()=> {
            const res = await client.get(url);
            return res.data;
        },
        enabled,
    })
}