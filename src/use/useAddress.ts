import { computed } from "vue";
import { instance, handleError } from "@/use/useIndexer";
import { useAxios } from "./useAxios";
import {
  address_data,
  fullstack_error,
  useTokenReturn,
  useIndexerError,
} from "@/types/fullstack.type";

//
export function useAddress(
  address: string
): useTokenReturn<address_data, useIndexerError> {
  const { result, loading, error } = useAxios<address_data, fullstack_error>(
    "address",
    { body: { address }, method: "post" },
    instance
  );

  const formatedError = computed(() => {
    if (error.value === null) {
      return error.value;
    }

    // Check if error from axios
    return handleError(error.value);
  });

  return { result, loading, error: formatedError };
}
