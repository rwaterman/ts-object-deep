export type DeepRenameValueFn = (value: any) => any | symbol;

export function renameValues<T>(obj: T): T {
  return obj;
}
