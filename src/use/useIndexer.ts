import axios, { AxiosError } from "axios";
import { useIndexerError, fullstack_error } from "@/types/fullstack.type";
import { UnwrapRef } from "vue";

// Set up instance for axios
export const instance = axios.create({
  baseURL:
    process.env.VUE_APP_SLP_INDEXER_API ||
    "https://api.fullstack.cash/v5/psf/slp",
  headers: {
    Authorization: `Token ${process.env.VUE_APP_JWT}`,
  },
});

//
export function handleError(
  error: UnwrapRef<AxiosError<fullstack_error>>
): useIndexerError {
  // Check if error from axios
  if (error.isAxiosError) {
    // Set error data from response
    return {
      status: error.response?.status || 503,
      message: error.response?.data?.error || "Service Unavailable",
    };
  } else {
    // Set unavailable error
    return {
      status: 503,
      message: "Service Unavailable",
    };
  }
}

// Export use token method
export { useToken } from "./useToken";
export { useTx } from "./useTx";
export { useAddress } from "./useAddress";
