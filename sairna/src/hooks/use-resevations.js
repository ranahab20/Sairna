 import { useMutation, useQueryClient } from "@tanstack/react-query";
import createReservation from "../api/reservations"

// React Query mutation hook
export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReservation,

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["seats", variables.tripId],
      });

      queryClient.invalidateQueries({
        queryKey: ["trip", variables.tripId],
      });
    },
  });
}