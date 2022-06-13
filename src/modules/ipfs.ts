//
export function gatewayUrl(url: string): string {
  // ipfs://{Hash}/metadata.json => {Hash}/metadata.json
  const ipfsUrl = url.slice(7);

  //
  const decodedIpfsUrl = decodeURIComponent(ipfsUrl);

  //
  return `https://ipfs.io/ipfs/${decodedIpfsUrl}`;
}

//
export function isIpfs(url: string): boolean {
  return url.startsWith("ipfs://");
}
