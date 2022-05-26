// Get version name from number are get from slp indexer
export function versionName(
  versionNumber: number
): "type1" | "nft1_group" | "nft1_child" | "unknown" {
  switch (versionNumber) {
    case 1:
      return "type1";
    case 129:
      return "nft1_group";
    case 65:
      return "nft1_child";
    default:
      return "unknown";
  }
}

// Add commas to number
// Ex: 1200050 => '1,200,050'
export function numberWithCommas(input: number): string {
  return input + ""; //  String(input).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// we will be extracting the range of elements from an array without mutating it
export function slice(
  array: unknown[],
  start: number,
  howMany: number
): unknown[] {
  return array.filter((item, index) => {
    return index >= start && index < howMany + start;
  });
}

//
export function getShortTxid(txid: string): string {
  return `${txid.slice(0, 12)}.....${txid.slice(-5)}`;
}
