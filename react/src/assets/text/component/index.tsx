import type { TextAsset } from "../types";
import { createElement } from "react";

const sizesEM: Record<NonNullable<TextAsset["size"]>, string> = {
  xs: "0.75em",
  sm: "1em",
  md: "1.25em",
  lg: "1.5em",
  xl: "2em",
};

export const TextComponent = ({
  value,
  size,
  color,
  fontFamily,
  fontWeight,
  as,
}: TextAsset) => {
  const styles: React.CSSProperties = {
    fontSize: sizesEM[size || "md"],
    color: color || "inherit",
    fontFamily: fontFamily || "sans-serif",
    fontWeight: fontWeight || "normal",
  };

  if (as) {
    return createElement(as, { style: styles }, value);
  }

  return <p style={styles}>{value}</p>;
};
