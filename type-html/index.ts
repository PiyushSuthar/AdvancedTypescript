type HtmlTags = `h${1 | 2 | 3 | 4 | 5 | 6}` | "p" | "div" | "span" | "html" | "body" | "head" | "title"

type ArrayToString<Arr> =
  Arr extends [infer A, ...infer B] ?
  A extends string ?
  RemoveWhiteSpace<`${A} ${ArrayToString<B>}`> : "" : ""

type RemoveWhiteSpace<Str extends string> =
  string extends Str
  ? "Error"
  : Str extends `${infer Str} ` ? RemoveWhiteSpace<Str> : Str

let helloWorld: ArrayToString<["Hello", "World"]> = "Hello World"

// type Props<T extends Object> = `${[K in keyof T]}`
type Tag<TagElement extends string, Content extends string> = `<${TagElement}>${Content}</${TagElement}>`

type Ele<TagElement extends HtmlTags, Content> =
  Content extends string ?
  Tag<TagElement, Content> :
  Content extends string[] ?
  Tag<TagElement, ArrayToString<Content>> :
  ""

let website: Ele<"html", [
  Ele<"head",
    Ele<"title", "Hello World">
  >,
  Ele<"body", [
    Ele<"div", [
      Ele<"h1", "Hello World">,
      Ele<"div",
        Ele<"p", "World can be a beatiful place too.">
      >
    ]>
  ]>
]> = "<html><head><title>Hello World</title></head> <body><div><h1>Hello World</h1> <div><p>World can be a beatiful place too.</p></div></div></body></html>"

type demos = Ele<"html",
  Ele<"div",
    [
      Ele<"h2", "Hello World">,
      Ele<"p", "Hello World, But in P tag.">
    ]
  >
>
