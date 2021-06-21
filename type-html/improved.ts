/**
 * Improved By Anurag Hazra (https://twitter.com/anuraghazru)
 */

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

// type HtmlTags = `h${1 | 2 | 3 | 4 | 5 | 6}` | "p" | "div" | "span" | "html" | "body" | "head" | "title"
type HtmlTags = keyof HTMLElementTagNameMap;

type ArrayToString<Arr> = Arr extends [infer A, ...infer B]
  ? A extends string
  ? RemoveWhiteSpace<`${A} ${ArrayToString<B>}`>
  : ""
  : "";
type RemoveWhiteSpace<Str extends string> = string extends Str
  ? "Error"
  : Str extends `${infer Str} `
  ? RemoveWhiteSpace<Str>
  : Str;

let helloWorld: ArrayToString<["Hello", "World"]> = "Hello World";

// type Props<T extends Object> = `${[K in keyof T]}`
type Tag<
  TagElement extends string,
  Props extends Record<string, any>,
  Content extends string
  > = `<${TagElement}${RecordToString<Props>}>${Content}</${TagElement}>`;

type RecordToString<Props extends Record<string, any>> = [keyof Props] extends [
  never
]
  ? ""
  : ` ${ArrayToString<
    TuplifyUnion<
      {
        [K in keyof Props]: `${string & K}="${Props[K]}"`;
      }[keyof Props]
    >
  >}`;


type test = RecordToString<{ hello: "world" }>
type Ele<
  TagElement extends HtmlTags,
  Props extends Record<string, any>,
  Content
  > = Content extends string
  ? Tag<TagElement, Props, Content>
  : Content extends string[]
  ? Tag<TagElement, Props, ArrayToString<Content>>
  : "";

namespace E {
  export type Body<Props, Child> = Ele<"body", Props, Child>;
  export type HTML<Props, Child> = Ele<"html", Props, Child>;
  export type Div<Props, Child> = Ele<"div", Props, Child>;
  export type H1<Props, Child> = Ele<"h1", Props, Child>;
  export type P<Props, Child> = Ele<"p", Props, Child>;
  export type Head<Props, Child> = Ele<"head", Props, Child>;
  export type Title<Props, Child> = Ele<"title", Props, Child>;
}

let website: E.HTML<null, [
  E.Head<
    null,
    E.Title<null, "Hello World">
  >,
  E.Body<null, [
    E.Div<null, [
      E.H1<{ color: "red" }, "Hello World">,
      E.Div<null,
        E.P<null, "World can be a beatiful place too.">
      >
    ]>
  ]>
]> = "<html><head><title>Hello World</title></head> <body><div><h1 color=\"red\">Hello World</h1> <div><p>World can be a beatiful place too.</p></div></div></body></html>"

type Demo = E.HTML<null, [
  E.Head<
    { nice: "works", alsoworks: "nice" },
    E.Title<null, "Hello World">
  >,
]>