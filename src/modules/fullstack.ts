import axios from "axios";
import { address_balance } from "@/types/fullstack.type";

//
export async function getAddressBalance(address: string): Promise<number> {
  const encodedAddress = encodeURIComponent(address);
  const result = axios.get<address_balance>(
    `https://api.fullstack.cash/v5/electrumx/balance/${encodedAddress}`
  );

  //
  const { data } = await result;

  //
  const balance = data.balance.confirmed + data.balance.unconfirmed;

  //
  return balance;
}
