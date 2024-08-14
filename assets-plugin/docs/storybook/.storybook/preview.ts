import DevtoolsUIPlugin, {
  Action,
  Collection,
  Input,
  Text,
  StackedView,
} from "@assets-plugin/plugin";
import { Preview } from "@storybook/react";
import { CommonTypesPlugin } from "@player-ui/common-types-plugin";
import { DataChangeListenerPlugin } from "@player-ui/data-change-listener-plugin";
import { ComputedPropertiesPlugin } from "@player-ui/computed-properties-plugin";
import { PlayerDecorator } from "@player-ui/storybook-addon-player";

const reactPlayerPlugins = [
  new DevtoolsUIPlugin(),
  new CommonTypesPlugin(),
  new DataChangeListenerPlugin(),
  new ComputedPropertiesPlugin(),
];

const components = {
  Action,
  Collection,
  Input,
  Text,
  StackedView,
};

export const parameters = {
  reactPlayerPlugins,
  dslEditor: {
    additionalModules: {
      "@assets-plugin/plugin": components,
    },
  },
  options: {
    storySort: {
      order: ["Welcome", "Devtools UI Assets", ["Docs"]],
    },
  },
  chakra: {
    theme: {},
  },
};

const preview: Preview = {
  parameters,
  decorators: [PlayerDecorator] as Preview["decorators"],
};

export default preview;
