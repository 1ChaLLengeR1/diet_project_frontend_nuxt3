export function findIds(collection: any[]): Array<string> {
  const ids: string[] = [];

  collection.forEach((item: any) => {
    ids.push(item.id);
  });

  return ids;
}
