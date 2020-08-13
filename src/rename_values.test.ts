import { DeepRenameValue, renameValues } from './rename_values';
import { SkipRename } from './constants';

describe(renameValues.name, () => {
  let obj: any;

  beforeEach(() => {
    obj = {
      x1: {
        y: 123,
        y2: '123',
        z: true,
        z2: false,
        z3: null,
        z4: undefined,
      },
      x2: {
        y: {
          y: 123,
          y2: '123',
        },
        z: {
          z: true,
          z2: false,
          z3: {
            z: {
              z: null,
              z2: undefined,
            },
          },
        },
      },
    };
  });

  describe("renames an object's values deeply for", () => {
    it('a number', () => {
      function renameValueFn(val: DeepRenameValue): DeepRenameValue | symbol {
        return val === 123 ? 321 : SkipRename;
      }

      const changed = renameValues(obj, renameValueFn);
      expect(changed).toEqual({
        x1: {
          y: 321,
          y2: '123',
          z: true,
          z2: false,
          z3: null,
          z4: undefined,
        },
        x2: {
          y: {
            y: 321,
            y2: '123',
          },
          z: {
            z: true,
            z2: false,
            z3: {
              z: {
                z: null,
                z2: undefined,
              },
            },
          },
        },
      });
    });

    it('a string', () => {
      function renameValueFn(val: DeepRenameValue): DeepRenameValue | symbol {
        return val === '123' ? '321' : SkipRename;
      }

      const changed = renameValues(obj, renameValueFn);
      expect(changed).toEqual({
        x1: {
          y: 123,
          y2: '321',
          z: true,
          z2: false,
          z3: null,
          z4: undefined,
        },
        x2: {
          y: {
            y: 123,
            y2: '321',
          },
          z: {
            z: true,
            z2: false,
            z3: {
              z: {
                z: null,
                z2: undefined,
              },
            },
          },
        },
      });
    });

    it('null', () => {
      function renameValueFn(val: DeepRenameValue): DeepRenameValue | symbol {
        return val === null ? false : SkipRename;
      }

      const changed = renameValues(obj, renameValueFn);
      expect(changed).toEqual({
        x1: {
          y: 123,
          y2: '123',
          z: true,
          z2: false,
          z3: false,
          z4: undefined,
        },
        x2: {
          y: {
            y: 123,
            y2: '123',
          },
          z: {
            z: true,
            z2: false,
            z3: {
              z: {
                z: false,
                z2: undefined,
              },
            },
          },
        },
      });
    });

    it('a true value', () => {
      function renameValueFn(val: DeepRenameValue): DeepRenameValue | symbol {
        return val === true ? false : SkipRename;
      }

      const changed = renameValues(obj, renameValueFn);
      expect(changed).toEqual(obj = {
        x1: {
          y: 123,
          y2: '123',
          z: false,
          z2: false,
          z3: null,
          z4: undefined,
        },
        x2: {
          y: {
            y: 123,
            y2: '123',
          },
          z: {
            z: false,
            z2: false,
            z3: {
              z: {
                z: null,
                z2: undefined,
              },
            },
          },
        },
      });
    });

    it('a false value', () => {
      function renameValueFn(val: DeepRenameValue): DeepRenameValue | symbol {
        return val === false ? true : SkipRename;
      }

      const changed = renameValues(obj, renameValueFn);
      expect(changed).toEqual(obj = {
        x1: {
          y: 123,
          y2: '123',
          z: true,
          z2: true,
          z3: null,
          z4: undefined,
        },
        x2: {
          y: {
            y: 123,
            y2: '123',
          },
          z: {
            z: true,
            z2: true,
            z3: {
              z: {
                z: null,
                z2: undefined,
              },
            },
          },
        },
      });
    });
  });
});
