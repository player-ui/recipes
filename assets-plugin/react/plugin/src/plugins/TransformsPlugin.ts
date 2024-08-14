import type { Player, PlayerPlugin } from "@player-ui/player";
import { AssetTransformPlugin } from "@player-ui/asset-transform-plugin";
import { actionTransform } from "@assets-plugin/action";
import { inputTransform } from "@assets-plugin/input";

export class TransformsPlugin implements PlayerPlugin {
  name = "devtools-ui-transforms";

  apply(player: Player) {
    player.registerPlugin(
      new AssetTransformPlugin([
        [{ type: "action" }, actionTransform],
        [{ type: "input" }, inputTransform],
      ])
    );
  }
}
