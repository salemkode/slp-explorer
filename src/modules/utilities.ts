// Add commas to number
// Ex: 1200050 => '1,200,050'
export function numberWithCommas(input: string | number): string {
  const parts = input.toString().split(".");

  //
  parts[0] = (+parts[0]).toLocaleString();

  //
  return parts.join(".");
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
