import React from "react";
import { AssetPropsWithChildren, Asset, createSlot } from "@player-tools/dsl";
import type { Asset as AssetType } from "@player-ui/player";
import { Collection } from "../../collection";
import { Text } from "../../text";
import type { StackedViewAsset } from "../types";

/**
 * Defines the component DSL representation for the StackedView view.
 */
export const StackedView = (
  props: AssetPropsWithChildren<StackedViewAsset>,
) => {
  const { children, ...rest } = props;

  return (
    <Asset type="stacked-view" {...rest}>
      {children}
    </Asset>
  );
};

const CollectionComp = (props: AssetPropsWithChildren<AssetType>) => {
  return (
    <Collection>
      <Collection.Values>{props.children}</Collection.Values>
    </Collection>
  );
};

StackedView.Header = createSlot({
  name: "header",
  TextComp: Text,
  CollectionComp,
  isArray: false,
  wrapInAsset: true,
});

StackedView.Main = createSlot({
  name: "main",
  TextComp: Text,
  CollectionComp,
  isArray: false,
  wrapInAsset: true,
});

StackedView.Footer = createSlot({
  name: "footer",
  TextComp: Text,
  CollectionComp,
  isArray: false,
  wrapInAsset: true,
});
