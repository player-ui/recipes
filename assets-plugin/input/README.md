# @assets-plugin/input

## Overview

`@assets-plugin/input` is a component package designed to be leveraged by a [Player-UI assets plugin](https://player-ui.github.io/next/plugins).

It provides an `Input` component that can be used to acquire data from the user.

## Installation

To install `@assets-plugin/input`, you can use pnpm or yarn:

```sh
pnpm i @assets-plugin/input
```

or

```sh
yarn add @assets-plugin/input
```

## Usage

You can leverage this asset through the `@assets-plugin/plugin`:

```ts
import { Input } from "@assets-plugin/plugin";

// and use it to define your Player-UI content:
myFlow = {
  id: "my_flow",
  views: [
    <MyView>
      <Input
        size={"md"}
        placeholder={"User input"}
        maxLength={10}
        binding={b`binding`}
      >
        <Input.Label>Label</Input.Label>
        <Input.Note>Some note</Input.Note>
      </Input>
    </MyView>,
  ],
};
```

For more information on how to author Player-UI content using DSL, please check our [Player-UI docs](https://player-ui.github.io/next/dsl#tsxjsx-content-authoring-player-dsl).

Or, your can leverage this asset in your own plugin:

```ts
// TransformPlugin.ts
import type { Player, PlayerPlugin } from "@player-ui/player";
import { AssetTransformPlugin } from "@player-ui/asset-transform-plugin";
import { inputTransform } from "@assets-plugin/input";

export class TransformsPlugin implements PlayerPlugin {
  name = "my-plugin-transforms";

  apply(player: Player) {
    player.registerPlugin(
      new AssetTransformPlugin([[{ type: "input" }, inputTransform]])
    );
  }
}
```

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
import { InputAsset, InputComponent } from "@assets-plugin/input";

export class AssetsRegistryPlugin
  implements ReactPlayerPlugin, ExtendedPlayerPlugin<[InputAsset]>
{
  name = "my-plugin";

  applyReact(reactPlayer: ReactPlayer) {
    reactPlayer.registerPlugin(
      new AssetProviderPlugin([["input", InputComponent]])
    );
  }

  apply(player: Player) {
    player.registerPlugin(new TransformsPlugin());
  }
}
```

## Contributing

We welcome contributions to `@assets-plugin/input`!
