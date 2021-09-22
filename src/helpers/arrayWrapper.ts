export default function arrayWrapper<T = unknown>(arg: T | T): T[] {
  return Array.isArray(arg) ? arg : [arg]
}
