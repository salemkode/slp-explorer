import bchaddr from "bchaddrjs-slp";
import { useRouter } from "vue-router";

//
export default function useSearch(): {
  search: (value: string) => void;
} {
  const router = useRouter();

  function search(value: string) {
    // Stop when value empty
    if (!value) {
      return;
    }

    const isValidAddress = bchaddr.isValidAddress(value);

    // TODO: Add search by block
    /* Block not support in slp indexer now
     * if (typeof value === "number") {
     *  router.push("/block/" + value);
     * }
     */

    //
    if (isValidAddress) {
      const address = bchaddr.toSlpAddress(value);
      router.push("/address/" + address);
    } else {
      router.push("/tx/" + value);
    }
  }

  //
  return { search };
}
