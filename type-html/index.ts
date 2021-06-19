type HtmlTags = `h${1 | 2 | 3 | 4 | 5 | 6}` | "p" | "div" | "span" | "html" | "body" | "head" | "title"

type ArrayToString<F> = F extends [infer A, ...infer B] ?
  A extends string ?
  `${A} ${ArrayToString<B>}` : "" : ""


let helloWorld: ArrayToString<["Hello", "World"]>

// type Props<T extends Object> = `${[K in keyof T]}`
type Tag<T extends string, B extends string> = `<${T}>${B}</${T}>`

type Ele<T extends HtmlTags, F> =
  F extends string ?
  Tag<T, F> :
  F extends string[] ?
  Tag<T, ArrayToString<F>> :
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
]> = "<html><head><title>Hello World</title></head> <body><div><h1>Hello World</h1> <div><p>World can be a beatiful place too.</p></div> </div> </body> </html>"

type demos = Ele<"html", Ele<"div", [Ele<"h2", "Hello World">, Ele<"p", "Hello World">]>>