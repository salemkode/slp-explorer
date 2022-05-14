import axios from "axios";

//
export async function getAddressTotalReceived(
  address: string
): Promise<string> {
  const encodedAddress = encodeURIComponent(address);
  const result = axios.get<{ totalReceived: string }>(
    `https://rest.bch.actorforth.org/v2/address/details/${encodedAddress}`
  );

  //
  const { data } = await result;

  //
  return data.totalReceived;
}
