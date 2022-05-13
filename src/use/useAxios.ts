import axios, { AxiosError, AxiosInstance } from "axios";
import { useAxiosConfig, useAxiosReturn } from "@/types/axios.type";
import { ref, UnwrapRef } from "vue";

export function useAxios<T, E>(
  url: string,
  config: useAxiosConfig = {
    method: "get",
  },
  instance: AxiosInstance = axios.create()
): useAxiosReturn<T, E> {
  const result = ref<null | T>(null);
  const error = ref<null | AxiosError<E>>(null);
  const loading = ref(true);

  async function mounted() {
    try {
      const _result = await instance(url, {
        method: config.method,
        data: config.body,
      });

      // Set data done without error
      result.value = _result.data as UnwrapRef<T>;
    } catch (_error) {
      error.value = _error as UnwrapRef<AxiosError<E>>;
    }

    // Stop loading
    loading.value = false;
  }

  mounted();
  return { result, loading, error };
}
