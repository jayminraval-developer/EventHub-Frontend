// src/api/queries/useProfileQuery.js
import { useQuery } from "@tanstack/react-query";
import api from "../axiosInstance";

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/user/profile");
      return data.user;
    },
  });
};
