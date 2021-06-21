type Parse<Str> =
  Str extends `"${infer Key}":${infer value}`
  ? value extends `"${infer value}"` ? { [K in Key]: value } : { [K in Key]: value }
  : {}

/**
 * JSON.parse in Types
 */
type Jsonify<Str> =
  Str extends `{${infer key},${infer rest}}`
  ? Parse<key> & Jsonify<rest>
  : Str extends `${infer key},${infer rest}`
  ? Parse<key> & Jsonify<rest>
  : Str extends `${infer key}` ?
  Parse<key> : {}

type test = Jsonify<"{\"hello\":\"world\",\"world\":2,\"destroyed\":false,\"wom\":\"dcfdf\"}">

let jsonifyTest: test = {
  hello: 'world',
  world: "2",
  destroyed: "false",
  wom: "dcfdf"
}
// Bug: number and booleans are parsed as string:(

type ArrayToString<Arr> = Arr extends [infer A, ...infer B]
  ? A extends string
  ? `${A},${ArrayToString<B>}`
  : ""
  : "";

/**
 * JSON.stringify in Types
 */
type Stringify<A extends Record<string, any>> =
  `{${ArrayToString<
    TuplifyUnion<
      { [K in keyof A]: `\"${string & K}\":\"${A[K]}\"` }[keyof A]
    >
  >}}`

type demo = Stringify<test>
let stringifyTest: demo = '{"hello":"world","wom":"dcfdf","world":"2","destroyed":"false",}'

/**
* ----- Union To Tuple Logic ----
*/
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

type Push<T extends any[], V> = [...T, V];

type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>;