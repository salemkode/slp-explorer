import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useAxiosReturn } from "@/types/axios.type";
import { ref, UnwrapRef } from "vue";

export function useAxios<T, E>(
  url: string,
  config: AxiosRequestConfig<unknown> = {
    method: "get",
  },
  instance: AxiosInstance = axios.create()
): useAxiosReturn<T, E> {
  const result = ref<null | T>(null);
  const error = ref<null | AxiosError<E>>(null);
  const loading = ref(true);
  let _callback: () => void = () => undefined;

  //
  function onFinished(callback: () => void) {
    _callback = callback;
  }

  //
  async function mounted() {
    //
    try {
      const _result = await instance(url, {
        method: config.method,
        data: config.data,
      });

      // Set data done without error
      result.value = _result.data as UnwrapRef<T>;
    } catch (_error) {
      error.value = _error as UnwrapRef<AxiosError<E>>;
    }

    // Stop loading
    loading.value = false;

    // Run callback
    _callback();
  }

  //
  mounted();

  //
  return { result, loading, error, onFinished };
}
