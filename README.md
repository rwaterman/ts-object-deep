# Description
A lightweight helper library with no dependencies to deeply rename either (1) object keys or (2) object values.

# Usage
This library can be used in either TypeScript or Javascript projects.

## renameKeys
* Create a function that tests whether the key should be renamed, and if so, to what. If the key should not be renamed, return the `SkipRename` symbol.
* The `DeepRenameKeyFn` type and `SkipRename` symbol can imported from this library.
* Example:

```typescript
const obj = { x: { y: { z: 123 } } };

function renameKeyFn(key: string): string | symbol  {
  return key && key.startsWith('y') ? 'y_changed' : SkipRename;
}

const changed = renameKeys(obj, renameKeyFn);
// `changed` now equals `{x: { y_changed: { z: 123 } } }`
```

## renameValues
* Create a function that tests whether the value should be renamed, and if so, to what. If the value should not be renamed, return the `SkipRename` symbol.
* The `DeepRenameValueFn` type and `SkipRename` symbol can imported from this library.
* Values that can be renamed are supported for primitive types only--see the `DeepRenameValue` type for more information.
* Example:

```typescript
const obj = { x: { y: { y: 123, z: '123' }, x2: '123' } };

function renameValueFn(val: DeepRenameValue): DeepRenameValue | symbol {
  return val === '123' ? 123 : SkipRename;
}

const changed = renameValues(obj, renameValueFn);
// `changed` now equals `{ x: { y: { y: 123, z: 123 } }, x2: 123 };`
```