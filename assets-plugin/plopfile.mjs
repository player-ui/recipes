import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname, resolve, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = resolve(__dirname);

export default function (plop) {
  plop.setActionType("renameBUILDFiles", function (answers) {
    const { assetName } = answers;
    const kebabCaseName = assetName.toLowerCase().replace(/\s/g, "-");

    fs.renameSync(
      join(basePath, `react/assets/${kebabCaseName}/BUILD.hbs`),
      join(basePath, `react/assets/${kebabCaseName}/BUILD`)
    );
    return `BUILD have been renamed`;
  });

  plop.setActionType("renameStorybookFiles", function (answers) {
    const { assetName } = answers;

    const pascalCaseName = assetName.replace(/(^\w|-\w|\s+\w)/g, (text) => {
      return text.replace(/(-|\s)/, "").toUpperCase();
    });

    const sbTemplatesBasePath = path.resolve(
      process.cwd(),
      "./docs/storybook/src/assets/"
    );

    fs.renameSync(
      join(sbTemplatesBasePath, "template.mdx"),
      join(sbTemplatesBasePath, `${pascalCaseName}.mdx`)
    );

    fs.renameSync(
      join(sbTemplatesBasePath, "template.stories.tsx"),
      join(sbTemplatesBasePath, `${pascalCaseName}.stories.tsx`)
    );

    return `${sbTemplatesBasePath}/template.stories.tsx.hbs and ${sbTemplatesBasePath}/template.stories.tsx.hbs have been renamed`;
  });

  plop.setGenerator("react-asset", {
    description: "Create a new React asset",
    prompts: [
      {
        type: "input",
        name: "assetName",
        message: "Asset name:",
      },
    ],
    actions: genReactAssetActions,
  });
}

const genReactAssetActions = [
  {
    type: "addMany",
    destination: "./react/assets/{{kebabCase assetName}}",
    base: "./asset-templates/react",
    templateFiles: "./asset-templates/react/**/*",
    globOptions: { dot: true },
    stripExtension: true,
  },
  {
    type: "renameBUILDFiles",
  },
  {
    type: "addMany",
    destination: "./docs/storybook/src/assets",
    base: "./docs/storybook/src/story-templates",
    templateFiles: "./docs/storybook/src/story-templates/*.hbs",
    stripExtension: true,
  },
  {
    type: "add",
    path: "./docs/storybook/src/flows/{{kebabCase assetName}}/basic.tsx",
    templateFile: "./docs/storybook/src/story-templates/flows/basic.tsx.hbs",
  },
  {
    type: "renameStorybookFiles",
  },
  {
    type: "append",
    path: "./docs/storybook/.storybook/preview.ts",
    pattern: /(?=\s})/,
    template: "  {{pascalCase assetName}},",
  },
  {
    type: "append",
    path: "./docs/storybook/.storybook/preview.ts",
    pattern: /(?=\s};)/,
    template: "  {{pascalCase assetName}},",
  },
  {
    type: "append",
    path: "./.bazelignore",
    pattern: /(.|\n)+(.*node_modules)/,
    template: "react/assets/{{kebabCase assetName}}/node_modules",
  },
  {
    type: "append",
    path: "./pnpm-workspace.yaml",
    pattern: /(.|\n)+(.[\w|"])/,
    template: '  - "react/assets/{{kebabCase assetName}}"',
  },
  {
    type: "append",
    path: "./react/plugin/README.md",
    pattern: /(.|\n)+(-\s.*)/,
    template: "- {{kebabCase assetName}}",
  },
  {
    type: "modify",
    path: "./react/plugin/package.json",
    pattern: /"$/m,
    template: '",\n    "@assets-plugin/{{kebabCase assetName}}": "workspace:*"',
  },
  {
    type: "append",
    path: "./react/plugin/BUILD",
    pattern: /(.|\n)+(.@dev.*)/,
    template: '        ":node_modules/@assets-plugin/{{kebabCase assetName}}",',
  },
  {
    type: "append",
    path: "./react/plugin/src/index.ts",
    pattern: /(.|\n)+(import.*from "@.*)/,
    template:
      'import { {{pascalCase assetName}}Asset, {{pascalCase assetName}} } from "@assets-plugin/{{kebabCase assetName}}";',
  },
  {
    type: "append",
    path: "./react/plugin/src/index.ts",
    pattern: /(export\s{(.|\s)*)+(,)/,
    template: "  {{pascalCase assetName}},",
  },
  {
    type: "append",
    path: "./react/plugin/src/index.ts",
    pattern: /(export\stype\s{)+(.|\n)*(?=\n};\n\s)/,
    template: "  {{pascalCase assetName}}Asset,",
  },
  {
    type: "modify",
    path: "./react/plugin/src/plugins/AssetsRegistryPlugin.tsx",
    pattern: /(?<=<\n\s*\[)(.|\n)+(?=\n\s*\]>)/,
    template: "$&, {{pascalCase assetName}}Asset",
  },
  {
    type: "append",
    path: "./react/plugin/src/plugins/AssetsRegistryPlugin.tsx",
    pattern: /(?<=import { TransformsPlugin } from "\.\/TransformsPlugin";\n)/,
    template:
      'import { {{pascalCase assetName}}Asset, {{pascalCase assetName}}Component } from "@assets-plugin/{{kebabCase assetName}}";',
  },
  {
    type: "modify",
    path: "./react/plugin/src/plugins/AssetsRegistryPlugin.tsx",
    pattern: /(?=\s+]\))/,
    template:
      '\n        ["{{kebabCase assetName}}", {{pascalCase assetName}}Component],',
  },
  {
    type: "append",
    path: "./react/plugin/src/plugins/TransformsPlugin.ts",
    pattern: /(?<=import { inputTransform } from "@assets-plugin\/input";\n)/,
    template:
      'import { {{camelCase assetName}}Transform } from "@assets-plugin/{{kebabCase assetName}}";',
  },
  {
    type: "modify",
    path: "./react/plugin/src/plugins/TransformsPlugin.ts",
    pattern: /(?=\s+])/,
    template:
      '\n        [{ type: "{{kebabCase assetName}}" }, {{camelCase assetName}}Transform],',
  },
];
