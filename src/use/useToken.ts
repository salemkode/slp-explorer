import { computed } from "vue";
import { instance, handleError } from "@/use/useIndexer";
import { useAxios } from "./useAxios";
import {
  token_data,
  fullstack_error,
  useTokenReturn,
  useIndexerError,
} from "@/types/fullstack.type";

//
export function useToken(
  tokenId: string,
  withTxHistory = true
): useTokenReturn<token_data, useIndexerError> {
  const { result, loading, error } = useAxios<token_data, fullstack_error>(
    "token",
    {
      method: "post",
      body: { tokenId, withTxHistory },
    },
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
