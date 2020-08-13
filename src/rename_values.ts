import { isPlainObject } from './is_plain_object';
import { SkipRename } from './constants';

export type DeepRenameValue = string | number | null | boolean | undefined;
export type DeepRenameValueFn = (val: DeepRenameValue) => DeepRenameValue | symbol;
export function renameValues<T, U>(obj: T, renameValueFn: DeepRenameValueFn): U {
  if (!isPlainObject(obj)) {
    const renameValResult = renameValueFn(obj as any);
    const valToUse = renameValResult === SkipRename ? obj : renameValResult;
    return valToUse as any;
  }

  return Object.entries(obj).reduce((acc: any, [key, value]: any) => {
    acc[key] = renameValues<T, U>(value, renameValueFn);
    return acc;
  }, {});
}
