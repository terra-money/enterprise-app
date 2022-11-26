export function compareAddress(address1: string, address2: string): boolean {
  if (address1 === undefined && address2 === undefined) {
    return true;
  }
  if (address1 !== undefined) {
    return address1.toLowerCase() === address2?.toLowerCase();
  }
  return false;
}
