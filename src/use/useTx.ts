import { computed } from "vue";
import { instance, handleError } from "@/use/useIndexer";
import { useAxios } from "./useAxios";
import {
  tx_data,
  fullstack_error,
  useTokenReturn,
  useIndexerError,
} from "@/types/fullstack.type";

//
export function useTx(txid: string): useTokenReturn<tx_data, useIndexerError> {
  const { result, loading, error } = useAxios<tx_data, fullstack_error>(
    "txid",
    { body: { txid }, method: "post" },
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
