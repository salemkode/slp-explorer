import axios, { AxiosError } from "axios";
import { backend_error } from "@/types/backend.type";
import { UnwrapRef } from "vue";

// Set up instance for axios
export const instance = axios.create({
  baseURL: process.env.VUE_APP_API || "https://api-slp-explorer.salemkode.com",
});

//
export function handleError(
  error: UnwrapRef<AxiosError<backend_error>>
): backend_error {
  // Check if error from axios
  if (error.isAxiosError) {
    // Set error data from response
    return {
      statusCode: error.response?.data.statusCode || 503,
      message: error.response?.data.message || "Service Unavailable",
    };
  } else {
    // Set unavailable error
    return {
      statusCode: 503,
      message: "Service Unavailable",
    };
  }
}

// Export use token method
export { useToken } from "./useToken";
export { useTx } from "./useTx";
export { useAddress } from "./useAddress";
