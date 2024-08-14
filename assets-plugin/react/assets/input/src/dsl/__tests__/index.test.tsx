import React from "react";
import { describe, expect, test } from "vitest";
import { render, binding as b } from "@player-tools/dsl";
import { Input } from "..";

describe("DSL: Input", () => {
  test("Renders default input", async () => {
    const rendered = await render(<Input binding={b`binding`} />);

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "input",
      binding: "binding",
    });
  });

  test("Renders input with size, placeholder and maxLength", async () => {
    const rendered = await render(
      <Input placeholder={"User input"} binding={b`binding`} />
    );

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "input",
      placeholder: "User input",
      binding: "binding",
    });
  });

  test("Renders input with label", async () => {
    const rendered = await render(
      <Input binding={b`binding`}>
        <Input.Label>Label</Input.Label>
      </Input>
    );

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "input",
      label: {
        asset: {
          id: "label",
          type: "text",
          value: "Label",
        },
      },
      binding: "binding",
    });
  });
});
