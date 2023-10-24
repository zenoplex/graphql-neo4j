// https://www.typescriptlang.org/play?ts=4.1.0-dev.20201028#example/string-manipulation-with-template-literals

type Split<
  T extends string,
  S extends string,
> = T extends `${infer U}${S}${infer V}`
  ? string extends U
    ? [U]
    : [U, ...Split<V, S>]
  : [T];

export const split = <T extends string, S extends string>(
  value: T,
  separator: S,
): Split<T, S> => {
  return value.split(separator) as Split<T, S>;
};

export const dropUndefined = <T>(value: T | undefined): value is T => {
  return value !== undefined;
};
