import { isPlainObject } from './is_plain_object';
import { SkipRename } from './constants';

export type DeepRenameKeyFn = (key: string) => string | symbol;

export function renameKeys<T>(obj: T, renameKeyFn: DeepRenameKeyFn): T {
  if (!isPlainObject(obj)) {
    return obj;
  }

  return Object.entries(obj).reduce((acc: any, [key, value]: any) => {
    const renameKeyResult = renameKeyFn(key);

    const keyToUse = renameKeyResult === SkipRename ? key : renameKeyResult;
    acc[keyToUse] = renameKeys(value, renameKeyFn);
    return acc;
  }, {});
}
