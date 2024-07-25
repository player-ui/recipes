import { Asset, AssetWrapper } from "@player-ui/types";
import { ValidationResponse } from "@player-ui/player";
import type { TextAsset } from "../../text";

type ValueType = string | undefined;

export interface InputAsset extends Asset<"input"> {
  /** The location in the data-model to store the data */
  binding: ValueType;

  /** A text asset for the action's label */
  label?: AssetWrapper<TextAsset>;

  /** Placeholder of the Input */
  placeholder?: string;
}

export interface TransformedInput extends InputAsset {
  /** A function to commit the new value to the data-model */
  set: (newValue: ValueType) => void;

  /** A function to format a value */
  format: (newValue: ValueType) => ValueType;

  /** The current value of the input from the data-model */
  value: ValueType;

  /** Any validation associated with the current input's value */
  validation?: ValidationResponse;
}
