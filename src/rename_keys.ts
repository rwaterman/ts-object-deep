import { isPlainObject } from './is_plain_object';

export type DeepRenameKeyFn = (key: string) => string | false;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function renameKeys<T>(obj: T, renameKeyFn: DeepRenameKeyFn): T {
  if (!isPlainObject(obj)) {
    return obj;
  }

  return Object.entries(obj).reduce((acc: any, [key, value]: any) => {
    acc[renameKeyFn(key) || key] = renameKeys(value, renameKeyFn);
    return acc;
  }, {});
}
