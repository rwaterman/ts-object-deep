import { isPlainObject } from './is_plain_object';
import { SkipRename } from './constants';

export type DeepRenameKeyFn = (key: string) => string | symbol;

export function renameKeys<T, U>(obj: T, renameKeyFn: DeepRenameKeyFn): U {
  if (!isPlainObject(obj)) {
    return obj as any;
  }

  return Object.entries(obj).reduce((acc: any, [key, value]: any) => {
    const renameKeyResult = renameKeyFn(key);

    const keyToUse = renameKeyResult === SkipRename ? key : renameKeyResult;
    acc[keyToUse] = renameKeys(value, renameKeyFn);
    return acc;
  }, {});
}
