# @assets-plugin/stacked-view

## Overview

`@assets-plugin/stacked-view` is a component package designed to be leveraged by a [Player-UI assets plugin](https://player-ui.github.io/next/plugins).

It provides an StackedView view. A simple stacked layout composed by header, main content and footer.

## Installation

To install `@assets-plugin/stacked-view`, you can use pnpm or yarn:

```sh
pnpm i @assets-plugin/stacked-view
```

or

```sh
yarn add @assets-plugin/stacked-view
```

## Usage

You can leverage this asset through the `@assets-plugin/plugin`:

```ts
import { StackedView, Text } from "@assets-plugin/plugin";

// and use it to define your Player-UI content:
myFlow = {
  id: "my_flow",
  views: [
    <StackedView>
      <StackedView.Header>
        <Text>Header</Text>
      </StackedView.Header>
      <StackedView.Main>
        <Text>Main</Text>
      </StackedView.Main>
      <StackedView.Footer>
        <Text>Footer</Text>
      </StackedView.Footer>
    </StackedView>,
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
import {
  StackedViewAsset,
  StackedViewComponent,
} from "@assets-plugin/stacked-view";

export class AssetsRegistryPlugin
  implements ReactPlayerPlugin, ExtendedPlayerPlugin<[StackedViewAsset]>
{
  name = "my-plugin";

  applyReact(reactPlayer: ReactPlayer) {
    reactPlayer.registerPlugin(
      new AssetProviderPlugin([["stacked-view", StackedViewComponent]]),
    );
  }

  apply(player: Player) {
    player.registerPlugin(new TransformsPlugin());
  }
}
```

## Contributing

We welcome contributions to `@assets-plugin/stacked-view`!
