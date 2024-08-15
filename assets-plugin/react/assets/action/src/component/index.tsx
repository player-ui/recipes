import React from "react";
import type { TransformedAction } from "../types";
import { ReactAsset } from "@player-ui/react";

const buttonStyle: React.CSSProperties = {
  backgroundColor: "#855ca8",
  border: "none",
  color: "white",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  borderRadius: "8px",
  cursor: "pointer",
};

const useActionPros = (props: TransformedAction) => {
  return {
    ...(props.label ? { children: <ReactAsset {...props.label.asset} /> } : {}),
    ...(props.run ? { onClick: props.run } : {}),
  } as const;
};

export const ActionComponent = (props: TransformedAction) => {
  const { children, ...buttonProps } = useActionPros(props);

  return (
    <button style={buttonStyle} {...buttonProps}>
      {children}
    </button>
  );
};
