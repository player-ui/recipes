# player-ui-react-recipe

## Overview

This repository contains all the necessary components to create and render Player-UI content using ReactPlayer.

## Running it locally

To run the project locally, follow these steps:

```sh
pnpm i
pnpm dev
```

## Folder structure

### assets

This directory contains an example of an assets plugin, including `action`, `collection`, `linput`, `stacked-view`, and `text`. Feel free to customize them or add new assets by running:

```sh
pnpm gen:asset
```

### constants

In this directory, you can define the constants used in the project.

### content

This directory houses the semantic content, which is platform-agnostic and written in our DSL (domain-specific language) based on `tsx`.

#### navigation

Multiple views within your flow are managed and transitioned by Player-UI. The navigation is automatically generated based on the views defined in the constants.

#### schema

Here, you will find the data schema and the generation of bindings.

#### views

Our views are written using DSL.

#### generated

This directory contains the JSON result from compiling the DSL content.
