import { initialize, transform } from "esbuild-wasm/lib/browser";
import * as React from "react";
import * as PlayerDSL from "@player-tools/dsl";

let initializedPromise: undefined | Promise<void>;
async function setup() {
  if (initializedPromise) {
    return initializedPromise;
  }

  initializedPromise = initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.20.2/esbuild.wasm",
  });

  return initializedPromise;
}

/** Eval the code and check imports */
export const execute = async (
  code: string,
  options?: {
    /** Other modules to include in the compilation */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    additionalModules?: Record<string, any>;
  }
) => {
  const { additionalModules = {} } = options ?? {};

  try {
    await setup();
  } catch (e) {
    console.error(e);
  }

  const result = await transform(code, {
    loader: "tsx",
    format: "cjs",
    tsconfigRaw: {
      compilerOptions: {},
    },
  });

  const mods = {
    react: React,
    "@player-tools/dsl": PlayerDSL,
    ...additionalModules,
  };

  // eslint-disable-next-line no-eval
  const mod = eval(`(function(require, module){ ${result.code}})`);

  const exp: {
    /** Exports of the running module */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exports?: any;
  } = {};
  /** a patch for `require` */
  const req = (name: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (mods as any)[name];
  };

  mod(req, exp);

  return exp.exports;
};
