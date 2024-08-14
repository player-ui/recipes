load("@npm//:defs.bzl", "npm_link_all_packages")
load("@rules_player//javascript:defs.bzl", "js_pipeline")
load("//helpers:defs.bzl", "tsup_config", "vitest_config")

npm_link_all_packages(name = "node_modules")

tsup_config(name = "tsup_config")

vitest_config(name = "vitest_config")

js_pipeline(
    package_name = "@assets-plugin/action",
    test_deps = [
        ":node_modules",
        "//:vitest_config",
    ],
    deps = [
        ":node_modules/@assets-plugin/text",
        ":node_modules/@assets-plugin/collection",
        "//:node_modules/@player-tools/dsl",
        "//:node_modules/@player-ui/types",
        "//:node_modules/@types/react",
        "//:node_modules/react",
        "//:node_modules/@player-ui/react",
        "//:node_modules/@player-ui/asset-transform-plugin",
        "//:node_modules/@player-ui/player",
    ],
)
