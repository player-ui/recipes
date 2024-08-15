import type { Asset, AssetWrapper, Expression } from "@player-ui/types";
import type { TextAsset } from "@assets-plugin/text";

export interface ActionAsset extends Asset<"action"> {
  /**text value for action */
  value?: string;

  /** A text asset for the action's label */
  label?: AssetWrapper<TextAsset>;

  /** An optional expression to execute before transitioning */
  exp?: Expression;
}

/** A stateful instance of an action */
export interface TransformedAction extends ActionAsset {
  /** A method to execute the action */
  run: () => void;
}
