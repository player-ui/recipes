import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basePath = resolve(__dirname);

const exampleFiles = ["action", "collection", "input", "stacked-view", "text"];

export default function (plop) {
  plop.setActionType("emptyExampleFiles", function (answers, config, plop) {
    return new Promise((resolve, reject) => {
      fs.readdir(config.path, (err, files) => {
        if (err) reject(err);

        for (const file of files) {
          let fullPath = path.join(config.path, file);
          if (
            fs.lstatSync(fullPath).isDirectory() &&
            exampleFiles.includes(file)
          ) {
            fs.rmdir(fullPath, { recursive: true }, (err) => {
              if (err) {
                reject(err);
              }
            });
          }
        }
        resolve();
      });
    });
  });

  plop.setActionType("renameFiles", function (answers) {
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
    actions: [
      {
        type: "addMany",
        destination: "./react/assets/{{kebabCase assetName}}",
        base: "./asset-templates/react",
        templateFiles: "./asset-templates/react/**/*",
        globOptions: { dot: true },
        stripExtension: true,
      },
      {
        type: "renameFiles",
      },
      ...Object.values(extendedActions),
    ],
  });

  plop.setGenerator("remove-examples", {
    description: "Remove example assets",
    actions: [
      {
        type: "emptyExampleFiles",
        path: "./docs/storybook/src/assets",
      },
      {
        type: "emptyExampleFiles",
        path: "./docs/storybook/src/flows",
      },
      {
        type: "emptyExampleFiles",
        path: "./react/assets",
      },
      {
        type: "modify",
        path: "./react/plugin/src/plugins/AssetsRegistryPlugin.tsx",
        pattern:
          /(import { InputAsset, InputComponent } from "@assets-plugin\/input";\nimport {\n  StackedViewAsset,\n  StackedViewComponent,\n} from "@assets-plugin\/stacked-view";\nimport { ActionAsset, ActionComponent } from "@assets-plugin\/action";\nimport {\n  CollectionAsset,\n  CollectionComponent,\n} from "@assets-plugin\/collection";\nimport { TextAsset, TextComponent } from "@assets-plugin\/text";\n\nand delete the following lines:\n\n        \["input", InputComponent\],\n        \["stacked-view", StackedViewComponent\],\n        \["action", ActionComponent\],\n        \["text", TextComponent\],\n        \["collection", CollectionComponent\],)/g,
        template: "",
      },
      {
        type: "modify",
        path: "./react/plugin/src/plugins/TransformsPlugin.ts",
        pattern:
          /(import { actionTransform } from "@assets-plugin\/action";\nimport { inputTransform } from "@assets-plugin\/input";\n\nand remove the following lines:\n\n        \[{ type: "action" }, actionTransform\],\n        \[{ type: "input" }, inputTransform\],)/g,
        template: "",
      },
      {
        type: "modify",
        path: "./react/plugin/BUILD",
        pattern:
          /(:node_modules\/@assets-plugin\/action",\n        ":node_modules\/@assets-plugin\/collection",\n        ":node_modules\/@assets-plugin\/stacked-view",\n        ":node_modules\/@assets-plugin\/input",\n        ":node_modules\/@assets-plugin\/text",)/g,
        template: "",
      },
      {
        type: "modify",
        path: "./react/plugin/package.json",
        pattern:
          /("@assets-plugin\/action": "workspace:\*",\n    "@assets-plugin\/collection": "workspace:\*",\n    "@assets-plugin\/input": "workspace:\*",\n    "@assets-plugin\/text": "workspace:\*",\n    "@assets-plugin\/stacked-view": "workspace:\*",)/g,
        template: "",
      },
      {
        type: "modify",
        path: "./pnpm-workspace.yaml",
        pattern:
          /(  - "react\/assets\/collection"\n  - "react\/assets\/text"\n  - "react\/assets\/action"\n  - "react\/assets\/input"\n  - "react\/assets\/stacked-view")/g,
        template: "",
      },
    ],
  });
}

const extendedActions = {
  storyBookAssetTemplates: {
    type: "addMany",
    destination: "./docs/storybook/src/assets",
    base: "./docs/storybook/src/story-templates",
    templateFiles: "./docs/storybook/src/story-templates/*.hbs",
    stripExtension: true,
  },
  storyBookAssetFlowTemplate: {
    type: "add",
    path: "./docs/storybook/src/flows/{{kebabCase assetName}}/basic.tsx",
    templateFile: "./docs/storybook/src/story-templates/flows/basic.tsx.hbs",
  },
  renameStorybookFiles: {
    type: "renameStorybookFiles",
  },
  linkingAssetToSBPreviewImport: {
    type: "append",
    path: "./docs/storybook/.storybook/preview.ts",
    pattern: /(?=\s})/,
    template: "  {{pascalCase assetName}},",
  },
  linkingAssetToSBPreviewComponent: {
    type: "append",
    path: "./docs/storybook/.storybook/preview.ts",
    pattern: /(?=\s};)/,
    template: "  {{pascalCase assetName}},",
  },
  bazelIgnore: {
    type: "append",
    path: "./.bazelignore",
    pattern: /(.|\n)+(.*node_modules)/,
    template: "react/assets/{{kebabCase assetName}}/node_modules",
  },
  pnpmWorkspace: {
    type: "append",
    path: "./pnpm-workspace.yaml",
    pattern: /(.|\n)+(.[\w|"])/,
    template: '  - "react/assets/{{kebabCase assetName}}"',
  },
  pluginReadme: {
    type: "append",
    path: "./react/plugin/README.md",
    pattern: /(.|\n)+(-\s.*)/,
    template: "- {{kebabCase assetName}}",
  },
  pluginPackageJson: {
    type: "modify",
    path: "./react/plugin/package.json",
    pattern: /"$/m,
    template: '",\n    "@assets-plugin/{{kebabCase assetName}}": "workspace:*"',
  },
  pluginBazelBuild: {
    type: "append",
    path: "./react/plugin/BUILD",
    pattern: /(.|\n)+(.@dev.*)/,
    template: '        ":node_modules/@assets-plugin/{{kebabCase assetName}}",',
  },
  pluginSrcIndexImportAsset: {
    type: "append",
    path: "./react/plugin/src/index.ts",
    pattern: /(.|\n)+(import.*from "@.*)/,
    template:
      'import { {{pascalCase assetName}}Asset, {{pascalCase assetName}} } from "@assets-plugin/{{kebabCase assetName}}";',
  },
  pluginSrcIndexExportAsset: {
    type: "append",
    path: "./react/plugin/src/index.ts",
    pattern: /(export\s{(.|\s)*)+(,)/,
    template: "  {{pascalCase assetName}},",
  },
  pluginSrcIndexExportAssetType: {
    type: "append",
    path: "./react/plugin/src/index.ts",
    pattern: /(export\stype\s{)+(.|\n)*(?=\n};\n\s)/,
    template: "  {{pascalCase assetName}}Asset,",
  },
  pluginSrcAssetRegistryAssetImport: {
    type: "append",
    path: "./react/plugin/src/plugins/AssetsRegistryPlugin.tsx",
    pattern: /(.|\n)+@dev.+/,
    template:
      'import { {{pascalCase assetName}}Asset, {{pascalCase assetName}}Component } from "@assets-plugin/{{kebabCase assetName}}";',
  },
  pluginSrcAssetRegistryAssetInterfaceExport: {
    type: "modify",
    path: "./react/plugin/src/plugins/AssetsRegistryPlugin.tsx",
    pattern: /(?=\s+])/,
    template: ",\n        {{pascalCase assetName}}Asset",
  },
  pluginSrcAssetRegistryAssetProvider: {
    type: "modify",
    path: "./react/plugin/src/plugins/AssetsRegistryPlugin.tsx",
    pattern: /(?=\s+]\))/,
    template:
      '\n        ["{{kebabCase assetName}}", {{pascalCase assetName}}Component],',
  },
  pluginSrcTransformFunctionImport: {
    type: "append",
    path: "./react/plugin/src/plugins/TransformPlugin.ts",
    pattern: /(.|\n)+@dev.+/,
    template:
      'import { {{camelCase assetName}}Transform } from "@assets-plugin/{{kebabCase assetName}}";',
  },
  pluginSrcTransformFunctionRegistry: {
    type: "modify",
    path: "./react/plugin/src/plugins/TransformPlugin.ts",
    pattern: /(?=\s+])/,
    template:
      '\n        [{ type: "{{kebabCase assetName}}" }, {{camelCase assetName}}Transform],',
  },
};
