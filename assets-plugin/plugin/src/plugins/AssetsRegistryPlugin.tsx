import React from "react";
import type { Player, PlayerPlugin } from "@player-ui/player";
import type {
  ExtendedPlayerPlugin,
  ReactPlayer,
  ReactPlayerPlugin,
} from "@player-ui/react";
import { AssetTransformPlugin } from "@player-ui/asset-transform-plugin";
import { AssetProviderPlugin } from "@player-ui/asset-provider-plugin-react";
import {
  InputAsset,
  InputComponent,
  inputTransform,
} from "@assets-plugin/input";
import {
  StackedViewAsset,
  StackedViewComponent,
} from "@assets-plugin/stacked-view";
import {
  ActionAsset,
  ActionComponent,
  actionTransform,
} from "@assets-plugin/action";
import {
  CollectionAsset,
  CollectionComponent,
} from "@assets-plugin/collection";
import { TextAsset, TextComponent } from "@assets-plugin/text";
import { TransformsPlugin } from "./TransformsPlugin";

export class AssetsRegistryPlugin
  implements
    ReactPlayerPlugin,
    ExtendedPlayerPlugin<
      [InputAsset, StackedViewAsset, ActionAsset, CollectionAsset, TextAsset]
    >
{
  name = "assets-plugin";

  applyReact(reactPlayer: ReactPlayer) {
    reactPlayer.registerPlugin(
      new AssetProviderPlugin([
        ["input", InputComponent],
        ["stacked-view", StackedViewComponent],
        ["action", ActionComponent],
        ["text", TextComponent],
        ["collection", CollectionComponent],
      ]),
    );
  }

  apply(player: Player) {
    player.registerPlugin(new TransformsPlugin());
  }
}
