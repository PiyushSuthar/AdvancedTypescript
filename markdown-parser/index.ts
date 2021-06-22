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
// type HtmlTags = keyof HTMLElementTagNameMap;
// Since I was getting performance issues, I replaced it with string
type HtmlTags = string;

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

type Ele<
  TagElement extends HtmlTags,
  Props extends Record<string, any>,
  Content
  > = Content extends string
  ? Tag<TagElement, Props, Content>
  : Content extends string[]
  ? Tag<TagElement, Props, ArrayToString<Content>>
  : "";

//  --- Utils from other plays

type ParseHeader<Str> = Str extends `${infer hashtag} ${infer content}`
  ? hashtag extends "#" ? Ele<"h1", null, content>
  : hashtag extends "##" ? Ele<"h2", null, content>
  : hashtag extends "###" ? Ele<"h3", null, content>
  : hashtag extends "####" ? Ele<"h4", null, content>
  : hashtag extends "#####" ? Ele<"h5", null, content>
  : hashtag extends "######" ? Ele<"h6", null, content> : content : Str
type demo = ParseHeader<"####### Hello">

type ParseMD<Str> = Str extends `#${infer text}`
  ? ParseHeader<Str>
  : Str extends `[${infer text}](${infer href})`
  ? Ele<"a", { href: href }, text>
  : Str extends `![${infer alt}](${infer src})`
  ? Ele<"img", { alt: alt, src: src }, ""> : ""


type MarkDown<Str, Sep extends string = "\n"> = Str extends `${infer line1}${Sep}${infer rest}` ? `${ParseMD<line1>} ${MarkDown<rest>}` : Str

type test = MarkDown<`### Hello World

[Hello](https://example.com)

![op](https://somebutifulimg.com/img.jpg)
## Hello World
`>

let som: test = '<h3>Hello World</h3>  <a href="https://example.com">Hello</a>  <img alt="op" src="https://somebutifulimg.com/img.jpg"></img> <h2>Hello World</h2> '