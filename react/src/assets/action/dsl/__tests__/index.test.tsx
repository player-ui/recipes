import { describe, expect, test } from "vitest";
import { render, expression as e } from "@player-tools/dsl";
import { Action } from "..";

describe("DSL: Action", () => {
  test("Renders action", async () => {
    const rendered = await render(<Action></Action>);

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "action",
    });
  });

  test("action with label", async () => {
    const rendered = await render(
      <Action>
        <Action.Label>Label</Action.Label>
      </Action>,
    );

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "action",
      label: {
        asset: {
          id: "label",
          type: "text",
          value: "Label",
        },
      },
    });
  });

  test("action with exp", async () => {
    const rendered = await render(
      <Action exp={e`noop`}>
        <Action.Label>Label</Action.Label>
      </Action>,
    );

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "action",
      exp: "noop",
      label: {
        asset: {
          id: "label",
          type: "text",
          value: "Label",
        },
      },
    });
  });
});
