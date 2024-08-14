import React from "react";
import type { TransformedInput } from "../types";
import { useInputProps } from "../hooks";
import { ReactAsset } from "@player-ui/react";

const inputStyle: React.CSSProperties = {
  minWidth: "50%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  boxSizing: "border-box",
  marginTop: "6px",
  marginBottom: "16px",
};

export const InputComponent = (props: TransformedInput) => {
  const { validation, label, id, placeholder } = props;
  const inputProps = useInputProps(props);

  return (
    <div>
      {label && (
        <label htmlFor={id}>
          <ReactAsset {...label.asset} />
        </label>
      )}
      <input
        id={id}
        style={inputStyle}
        {...inputProps}
        placeholder={placeholder}
      />
      {validation && <span>{validation.message}</span>}
    </div>
  );
};
