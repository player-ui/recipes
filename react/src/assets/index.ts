import type { Player, PlayerPlugin } from "@player-ui/player";
import type {
  ExtendedPlayerPlugin,
  ReactPlayer,
  ReactPlayerPlugin,
} from "@player-ui/react";
import { AssetTransformPlugin } from "@player-ui/asset-transform-plugin";
import { AssetProviderPlugin } from "@player-ui/asset-provider-plugin-react";
import { InputAsset, InputComponent, inputTransform } from "./input";
import { StackedViewAsset, StackedViewComponent } from "./stacked-view";
import { ActionAsset, ActionComponent, actionTransform } from "./action";
import { CollectionAsset, CollectionComponent } from "./collection";
import { TextAsset, TextComponent } from "./text";

// Register your transforms here:
// for more information about transforms, see the documentation
// https://player-ui.github.io/latest/assets/transforms#transforms
class TransformsPlugin implements PlayerPlugin {
  name = "transform-plugin";

  apply(player: Player) {
    player.registerPlugin(
      new AssetTransformPlugin([
        // Add your transforms here
        [{ type: "input" }, inputTransform],
        [{ type: "action" }, actionTransform],
      ]),
    );
  }
}

export class AssetsRegistryPlugin
  implements
    ReactPlayerPlugin,
    ExtendedPlayerPlugin<
      [
        // Add your component types here
        InputAsset,
        StackedViewAsset,
        ActionAsset,
        CollectionAsset,
        TextAsset,
      ]
    >
{
  name = "assets-plugin";

  // Register your assets here:
  // for more information about assets, see the documentation
  // https://player-ui.github.io/latest/content/assets-views#assets
  applyReact(reactPlayer: ReactPlayer) {
    reactPlayer.registerPlugin(
      new AssetProviderPlugin([
        // Add your assets here
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
