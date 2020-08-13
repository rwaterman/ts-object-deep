import { renameKeys } from './rename_keys';
import { SkipRename } from './constants';

describe('renameKeys', () => {
  let obj: any;

  beforeEach(() => {
    obj = { x: { y: { z: 123 } } };
  });

  describe("renames an object's keys deeply", () => {
    it('one level deep', () => {
      function renameKeyFn(key: string) {
        return key && key.startsWith('x') ? 'x_changed' : SkipRename;
      }

      const changed = renameKeys(obj, renameKeyFn);
      expect(changed).toEqual({ x_changed: { y: { z: 123 } } });
    });

    it('two levels deep', () => {
      function renameKeyFn(key: string) {
        return key && key.startsWith('y') ? 'y_changed' : SkipRename;
      }

      const changed = renameKeys(obj, renameKeyFn);
      expect(changed).toEqual({ x: { y_changed: { z: 123 } } });
    });

    it('three levels deep', () => {
      function renameKeyFn(key: string) {
        return key && key.startsWith('z') ? 'z_changed' : SkipRename;
      }

      const changed = renameKeys(obj, renameKeyFn);
      expect(changed).toEqual({ x: { y: { z_changed: 123 } } });
    });
  });

  describe('does not rename an object keys', () => {
    it('if the callback returns false', () => {
      function renameKeyFn(key: string) {
        return key && key.startsWith('a') ? 'a_changed' : SkipRename;
      }

      const changed = renameKeys(obj, renameKeyFn);
      expect(changed).toEqual({ x: { y: { z: 123 } } });
    });
  });
});
