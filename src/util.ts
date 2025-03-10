export function exhaustiveGuard(_value: never): never {
    throw new Error("Exhaustive guard");
}
