const arrayWrapper = <T = unknown>(arg: T | T[] = []): T[] => (Array.isArray(arg) ? arg : [arg])

export default arrayWrapper
