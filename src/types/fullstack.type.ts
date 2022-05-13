// Import type
import { ComputedRef } from "vue";
import { useAxiosReturn } from "@/types/axios.type";

// https://api.fullstack.cash/v5/electrumx/balance
// Address
export interface address_balance {
  success: boolean;
  balance: { confirmed: number; unconfirmed: number };
}

// https://api.fullstack.cash/v5/psf/slp/token
// Token end point
export interface token_data {
  tokenData: {
    type: number;
    ticker: string;
    name: string;
    tokenId: string;
    documentUri: string;
    documentHash: string;
    decimals: number;
    mintBatonIsActive: boolean;
    tokensInCirculationBN: string;
    tokensInCirculationStr: string;
    blockCreated: number;
    totalMinted: string;
    totalBurned: string;
    txs: Array<token_data__tx | token_data__burn_tx> | undefined;
  };
}

// item of txs in Token_data
export interface token_data__tx {
  txid: string;
  height: number;
  type: "GENESIS" | "SEND" | "MINT" | "BURN-UNCONTROLLED" | "SEND-BURN";
  qty: string;
}

// burn tx
export interface token_data__burn_tx extends token_data__tx {
  type: "BURN-UNCONTROLLED" | "SEND-BURN";
  burned: string;
}

// https://api.fullstack.cash/v5/psf/slp/address/
// SLP balance for address.
export interface address_data {
  balance: {
    utxos: Array<{
      txid: string;
      vout: number;
      type: string;
      tokenType: number;
      qty: string;
      tokenId: string;
      address: string;
      decimals: number;
      effectiveQty: string;
      value: number;
    }>;
    txs: Array<{
      txid: string;
      height: string;
    }>;
    balances: Array<{
      tokenId: string;
      qty: string;
    }>;
  };
}

//
export interface tx_data {
  txData: {
    txid: string;
    hash: string;
    version: number;
    size: number;
    locktime: number;
    vin: Array<{
      txid: string;
      vout: 1;
      scriptSig: {
        asm: string;
        hex: string;
      };
      sequence: number;
      address: string;
      value: number;
      tokenQty: number;
      tokenQtyStr: string;
      tokenId: string | null;
    }>;
    vout: Array<{
      value: number;
      n: number;
      scriptPubKey: {
        asm: string;
        hex: string;
        type: string;
        reqSigs?: 1;
        addresses?: string[];
      };
      opReturnData: {
        tokenType: number;
        txType: string;
        ticker: string;
        name: string;
        tokenId: string;
        documentUri: string;
        documentHash: string;
        decimals: number;
        mintBatonVout: number;
        qty: string;
      };
      tokenQtyStr: string;
      tokenQty: number;
      isMintBaton?: boolean;
    }>;
    hex: string;
    blockhash: string;
    confirmations: number;
    time: number;
    blocktime: number;
    blockheight: number;
    isSlpTx: boolean;
    tokenTxType: string;
    tokenId: string;
    tokenType: number;
    tokenTicker: string;
    tokenName: string;
    tokenDecimals: number;
    tokenUri: string;
    tokenDocHash: string;
    isValidSlp: boolean;
  };
}

// Error
export interface fullstack_error {
  success: boolean;
  error: string;
}

//
export interface useIndexerError {
  status: number;
  message: string;
}

//
export interface useTokenReturn<T, E>
  extends Omit<useAxiosReturn<T, E>, "error"> {
  error: ComputedRef<{
    status: number;
    message: string;
  } | null>;
}
