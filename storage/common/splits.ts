export function splitString(string: string, separator: string = "_"): string[] {
  const collection: string[] = string.split(separator);
  return collection;
}

export function findString(string: string, search: string): boolean {
  const index: number = string.indexOf(search);
  if (index >= 0) {
    return true;
  }
  return false;
}
