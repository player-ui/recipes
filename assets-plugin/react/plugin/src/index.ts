import { ActionAsset, Action } from "@assets-plugin/action";
import { CollectionAsset, Collection } from "@assets-plugin/collection";
import { StackedViewAsset, StackedView } from "@assets-plugin/stacked-view";
import { InputAsset, Input } from "@assets-plugin/input";
import { TextAsset, Text } from "@assets-plugin/text";
import { AssetsRegistryPlugin } from "./plugins";

export default AssetsRegistryPlugin;

export type {
  ActionAsset,
  CollectionAsset,
  InputAsset,
  StackedViewAsset,
  TextAsset,
};

export { Action, Collection, Input, Text, StackedView };
