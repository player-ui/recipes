import { Asset } from "@player-ui/types";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";

export type TextElement =
  | "b"
  | "i"
  | "u"
  | "abbr"
  | "cite"
  | "del"
  | "em"
  | "ins"
  | "kbd"
  | "mark"
  | "s"
  | "samp"
  | "sub"
  | "sup"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span";

export interface TextAsset extends Asset<"text"> {
  value: string;
  size?: TextSize;
  as?: TextElement;
  color?: string;
  fontFamily?: string;
  fontWeight?: string | number;
}
