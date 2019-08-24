# WIP

# Usage
This library can be used in either TypeScript or Javascript projects.

## renameKeys
* Create a function that tests whether the key should be renamed, and if so, to what. If the key should not be renamed, return false;
* The `DeepRenameKeyFn` type can imported as needed in your Typescript project.
* Example:

```typescript

const obj = { x: { y: { z: 123 } } };

function renameKeyFn(key: string) {
  return key && key.startsWith('y') ? 'y_changed' : false;
}

const changed = renameKeys(obj, renameKeyFn);
// `changed` now equals `{x: { y_changed: { z: 123 } } }`
```

## renameValues (WIP)

# TODO:
* `renameValues`
* npm module
* ES7 is required but this can be ES6.
