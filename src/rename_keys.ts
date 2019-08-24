import { isPlainObject } from './common';

export type DeepRenameKeyFn = (key: string) => string | false;

export function renameKeys(obj: any, renameKeyFn: DeepRenameKeyFn) {
  if (!isPlainObject(obj)) {
    return obj;
  }

  return Object.entries(obj).reduce((acc: any, [key, value]: any) => {
    acc[renameKeyFn(key) || key] = renameKeys(value, renameKeyFn);
    return acc;
  }, {});
}
