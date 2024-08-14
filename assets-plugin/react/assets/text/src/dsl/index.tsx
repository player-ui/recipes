import React from "react";
import { AssetPropsWithChildren, Asset } from "@player-tools/dsl";
import type { TextAsset } from "../types";

/**
 * Defines the component DSL representation, so users of this plugin can author Player-UI
 * content leveraging .jsx/.tsx syntax.
 */
export const Text = (
  props: Omit<AssetPropsWithChildren<TextAsset>, "value"> & {
    value?: string;
  },
) => (
  <Asset type="text" {...props}>
    <property name="value">{props.children}</property>
  </Asset>
);
