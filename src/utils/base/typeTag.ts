export function baseTypeTag(value: any) {
  return Object.prototype.toString.call(value);
}
