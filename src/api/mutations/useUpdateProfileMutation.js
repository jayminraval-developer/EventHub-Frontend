// src/api/mutations/useUpdateProfileMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../axiosInstance";

export const useUpdateProfileMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.user;
    },
    onSuccess: () => {
      qc.invalidateQueries(["profile"]);
    },
  });
};
