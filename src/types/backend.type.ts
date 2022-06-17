// Import type
import { useAxiosReturn } from "@/types/axios.type";
import { AxiosError } from "axios";
import { UnwrapRef, Ref } from "vue";

//
export type tokenTypeName = "type1" | "nft1_group" | "nft1_child" | "unknown"

//
export type token_tx = {
  txid: string;
  type: string;
  qty: string;
  block: number;
  time: number;
};

// Token
export interface token_data {
  details: {
    tokenId: string;
    type: tokenTypeName;
    name: string;
    ticker: string;
    creator: string;
    time: number;
    decimals: number;
    documentUri: string;
    documentHash: string;
    parentGroupId?: string;
  };
  stats: {
    block: number;
    tokensInCirculation: string;
    mintBatonIsActive: boolean;
    totalMinted: string;
    totalBurned: string;
    qtyTransactions: number;
    qtyAddresses: number;
  };
  tx: {
    length: number;
    allPage: number;
    currentPage: number;
    txs: token_tx[];
  };
  nft: {
    length: number;
    allPage: number;
    currentPage: number;
    nfts: string[];
  };
}

// Transactions
export interface tx_data {
  details: {
    type: string;
    block: number;
    time: number;
    txid: string;
    creator: string;
  };
  token: {
    type: tokenTypeName;
    ticker: string;
    name: string;
    tokenId: string;
    documentUri: string;
    documentHash: string;
    decimals: number;
  };
  inputs: {
    qty: string;
    address: string;
    txid?: string;
  }[];
  outputs: {
    qty: string;
    address: string;
    mint_baton: boolean;
  }[];
}

//
export type balance_item = {
  tokenId: string;
  name: string;
  ticker: string;
  qty: string;
};

//
export type transaction_item = {
  block: number;
  txid: string;
  type: "SEND" | "RECV";
  qty: number;
  tokenId: string;
  tokenName: string;
};

//
export interface address_data {
  balance: {
    length: number;
    allPage: number;
    currentPage: number;
    balances: balance_item[];
  };
  transaction: {
    length: number;
    allPage: number;
    currentPage: number;
    transactions: transaction_item[];
  };
}

// Error
export interface backend_error {
  statusCode: number;
  message: string;
}

export type axios_error = AxiosError<backend_error>;

//
interface useBackendReturn<T, E>
  extends Omit<useAxiosReturn<T, E>, "error" | "onFinished"> {
  error: Ref<null | UnwrapRef<E>>;
}

// use return data
export type useTxReturn = useBackendReturn<tx_data, backend_error>;
export interface useTokenReturn
  extends useBackendReturn<token_data, backend_error> {
  getTx(index: number): Promise<token_data["tx"]>;
  getNft(index: number): Promise<token_data["nft"]>;
}
export interface useAddressReturn
  extends useBackendReturn<address_data, backend_error> {
  getBalance(index: number): Promise<address_data["balance"]>;
  getTransaction(index: number): Promise<address_data["transaction"]>;
}
