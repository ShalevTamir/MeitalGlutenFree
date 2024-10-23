export function injectDefaultValues<T>(defaultValuesObj: T, obj?: T): T{
    return { ...defaultValuesObj, ...obj }
}