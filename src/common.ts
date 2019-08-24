export function isPlainObject(obj: any) {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}
