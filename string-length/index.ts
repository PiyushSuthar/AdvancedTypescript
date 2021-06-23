/**
 * Get length of a string!
 */
type Length<Str extends string, C extends 0[] = []> = Str extends `${infer alphabet}${infer rest}`
  ? Length<rest, [0, ...C]> : C["length"]

type test = Length<"Hello">