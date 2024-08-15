# Player-UI Assets Plugin Recipe

## Packages

The packages in this repository are designed to be used as assets in Player-UI. Each package is self-contained and can be used independently. They are located in their respective directories under the root of the project.

## Assets Plugin

The assets plugin is a convenient way to use the assets packages in Player-UI. It provides a unified interface for managing and using the assets.

## Getting Started

To get started you need to install the dependencies. We use `pnpm` as the package manager. If you haven't installed it, you can do so by running `npm install -g pnpm`. Then, you can install the dependencies by running `pnpm install`.

## Development

For development, we use Bazel. If you haven't installed it, you can do so by following the instructions on the [Bazel website](https://bazel.build/).

Make sure to get [bazelisk](https://github.com/bazelbuild/bazelisk) to manage the version of Bazel.

To build the project, you can run `bazel build //...`.

To run the tests, you can run `bazel test //...`.

## Storybook

We use Storybook for developing and showcasing the components. You can start the Storybook server by running `bazel run //docs/storybook:start`. Then, you can open your browser and navigate to `localhost:6006` to view the Storybook.

## Generating Assets

We provide a plop generator for creating new assets. You can run it by executing `pnpm run gen:asset`. It will guide you through the process of creating a new asset.

## Contributing

We welcome contributions! If you find something interesting you want to contribute to the repo, feel free to raise a PR, or open an issue for features you'd like to see added.
