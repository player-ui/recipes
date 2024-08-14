import React from "react";
import { DSLPlayerStory } from "../player";

/** Create a story */
export function createDSLStory(
  loader: () => Promise<
    | string
    | {
        /** for dynamic imports */
        default: string;
      }
  >,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any
) {
  /** The story to render */
  const Comp = () => {
    return <DSLPlayerStory dslContent={loader} />;
  };

  if (options?.args) {
    Comp.args = options.args;
  }

  return {
    render: Comp,
  };
}
