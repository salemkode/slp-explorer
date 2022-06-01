import { ref } from "vue";
import { instance, handleError } from "@/use/useBackend";
import { useAxios } from "./useAxios";
import {
  address_data,
  backend_error,
  useAddressReturn,
} from "@/types/backend.type";

//
export function useAddress(address: string): useAddressReturn {
  const encodeAddress = encodeURIComponent(address);

  //
  const { result, loading, error, onFinished } = useAxios<
    address_data,
    backend_error
  >(`/address/${encodeAddress}`, {}, instance);

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
  async function getBalance(index: number): Promise<address_data["balance"]> {
    if (result.value === null) {
      throw "Wait to load address";
    }

    if (result.value.balance.allPage > index) {
      const result = await instance.get<address_data["balance"]>(
        `/address/${encodeAddress}/balance/${index}`
      );

      return result.data;
    } else {
      throw "this index is Incorrect";
    }
  }

  //
  async function getTransaction(
    index: number
  ): Promise<address_data["transaction"]> {
    if (result.value === null) {
      throw "Wait to load address";
    }

    if (result.value.transaction.allPage > index) {
      const result = await instance.get<address_data["transaction"]>(
        `/address/${encodeAddress}/transaction/${index}`
      );

      return result.data;
    } else {
      throw "this index is Incorrect";
    }
  }

  //
  return { result, loading, error: formatedError, getBalance, getTransaction };
}
