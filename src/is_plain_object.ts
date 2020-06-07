export function isPlainObject<T>(obj: T): boolean {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}
