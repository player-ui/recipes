# @assets-plugin/text

## Overview

`@assets-plugin/text` is a component package designed to be leveraged by a [Player-UI assets plugin](https://player-ui.github.io/next/plugins).

It provides an `Text` component that can be used to render strings.

## Installation

To install `@assets-plugin/text`, you can use pnpm or yarn:

```sh
pnpm i @assets-plugin/text
```

or

```sh
yarn add @assets-plugin/text
```

## Usage

You can leverage this asset through the `@assets-plugin/plugin`:

```ts
import { Text } from "@assets-plugin/plugin";

// and use it to define your Player-UI content:
myFlow = {
  id: "my_flow",
  views: [
    <MyView>
      <Text as="b">Value</Text>
    </MyView>,
  ],
};
```

For more information on how to author Player-UI content using DSL, please check our [Player-UI docs](https://player-ui.github.io/next/dsl#tsxjsx-content-authoring-player-dsl).

Or, your can leverage this asset in your own plugin:

```ts
// AssetRegistryPlugin.ts
import React from "react";
import type { Player } from "@player-ui/player";
import type {
  ExtendedPlayerPlugin,
  ReactPlayer,
  ReactPlayerPlugin,
} from "@player-ui/react";
import { AssetProviderPlugin } from "@player-ui/asset-provider-plugin-react";
import { TransformsPlugin } from "./TransformPlugin";
import { TextAsset, TextComponent } from "@assets-plugin/text";

export class AssetsRegistryPlugin
  implements ReactPlayerPlugin, ExtendedPlayerPlugin<[TextAsset]>
{
  name = "my-plugin";

  applyReact(reactPlayer: ReactPlayer) {
    reactPlayer.registerPlugin(
      new AssetProviderPlugin([["text", TextComponent]]),
    );
  }

  apply(player: Player) {
    player.registerPlugin(new TransformsPlugin());
  }
}
```

## Contributing

We welcome contributions to `@assets-plugin/text`!
