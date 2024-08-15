# @assets-plugin/plugin

## Overview

`@assets-plugin/plugin` is a [Player-UI](https://player-ui.github.io/next/plugins) assets plugin.

It register the following assets into your React Player instance:

- action
- collection
- input
- text
- stacked-view

## Installation

To install `@assets-plugin/plugin`, you can use pnpm or yarn:

```sh
pnpm i @assets-plugin/plugin
```

or

```sh
yarn add @assets-plugin/plugin
```

## Usage

You can leverage this plugin through the `@assets-plugin/plugin`:

```ts
import { ReactPlayer } from "@player-ui/react";
import DevtoolsUIPlugin from "@assets-plugin/plugin";

const reactPlayer = new ReactPlayer({
  plugins: [new DevtoolsUIPlugin()],
});
```

## Contributing

We welcome contributions to `@assets-plugin/plugin`!
