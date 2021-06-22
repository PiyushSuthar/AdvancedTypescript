/**
 * Converts "hello-world" to "helloWorld"
 */
type ToCamelCase<Str extends string> =
  Str extends `${infer first}-${infer second}`
  ? `${first}${Capitalize<second>}`
  : Str

/**
* Removes whitespaces
*/
type RemoveWhiteSpace<Str> =
  Str extends ` ${infer text}`
  ? RemoveWhiteSpace<text>
  : Str extends `${infer text} `
  ? RemoveWhiteSpace<text>
  : Str

/**
* Converts html styles string to Css-In-Js object.
*/
type CssToCssInJs<CSS extends string> =
  CSS extends `${infer key}:${infer value};${infer rest}`
  ? {
    [K in ToCamelCase<
      RemoveWhiteSpace<key>
    >]: RemoveWhiteSpace<value>
  } & CssToCssInJs<rest> : {}


type test = CssToCssInJs<
  "color: blue; background-color: url(./dfkjd.jpg); box-shadow: 12px 12px 12px 0px rgba(0,0,0,0.1);"
>

let demo: test = {
  color: "blue",
  backgroundColor: "url(./dfkjd.jpg)",
  boxShadow: "12px 12px 12px 0px rgba(0,0,0,0.1)"
}