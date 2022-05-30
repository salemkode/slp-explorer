import { AxiosError } from "axios";
import { Ref, UnwrapRef } from "vue";

//
export interface useAxiosReturn<T, E> {
  result: Ref<UnwrapRef<T> | null>;
  loading: Ref<boolean>;
  error: Ref<null | UnwrapRef<AxiosError<E>>>;
  onFinished(callback: () => void): void;
}

//
export interface useAxiosConfig {
  method: "get" | "delete" | "post" | "put";
  body?: unknown;
}
