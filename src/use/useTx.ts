import { instance, handleError } from "@/use/useBackend";
import { useAxios } from "./useAxios";
import { tx_data, backend_error, useTxReturn } from "@/types/backend.type";
import { ref } from "vue";

//
export function useTx(txid: string): useTxReturn {
  const encodeTxid = encodeURIComponent(txid);

  //
  const { result, loading, error, onFinished } = useAxios<
    tx_data,
    backend_error
  >(`/tx/${encodeTxid}`, {}, instance);

  //
  const formatedError = ref<null | backend_error>(null);

  //
  onFinished(() => {
    if (error.value === null) {
      return error.value;
    }

    // Check if error from axios
    formatedError.value = handleError(error.value);
  });

  //
  return { result, loading, error: formatedError };
}
