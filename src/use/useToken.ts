import { instance, handleError } from "@/use/useBackend";
import { useAxios } from "./useAxios";
import {
  token_data,
  backend_error,
  useTokenReturn,
} from "@/types/backend.type";
import { ref } from "vue";

//
export function useToken(tokenId: string): useTokenReturn {
  const encodetokenId = encodeURIComponent(tokenId);

  //
  const { result, loading, error, onFinished } = useAxios<
    token_data,
    backend_error
  >(`/token/${encodetokenId}`, {}, instance);

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
  async function getTx(index: number): Promise<token_data["tx"]> {
    if (result.value === null) {
      throw "Wait to load address";
    }

    if (result.value.tx.allPage > index) {
      const result = await instance.get<token_data["tx"]>(
        `/token/${encodetokenId}/tx/${index}`
      );

      return result.data;
    } else {
      throw "this index is Incorrect";
    }
  }

  //
  return { result, loading, error: formatedError, getTx };
}
