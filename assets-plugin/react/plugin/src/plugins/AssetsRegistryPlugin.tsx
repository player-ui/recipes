import type { Player } from "@player-ui/player";
import type {
  ExtendedPlayerPlugin,
  ReactPlayer,
  ReactPlayerPlugin,
} from "@player-ui/react";
import { AssetProviderPlugin } from "@player-ui/asset-provider-plugin-react";
import { InputAsset, InputComponent } from "@assets-plugin/input";
import {
  StackedViewAsset,
  StackedViewComponent,
} from "@assets-plugin/stacked-view";
import { ActionAsset, ActionComponent } from "@assets-plugin/action";
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
      ])
    );
  }

  apply(player: Player) {
    player.registerPlugin(new TransformsPlugin());
  }
}
