import React from "react";
import { describe, expect, test } from "vitest";
import { render } from "@player-tools/dsl";
import { Text } from "../";

describe("DSL: Text", () => {
  test("Renders text - no optional props", async () => {
    const rendered = await render(<Text>Test</Text>);

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "text",
      value: "Test",
    });
  });

  test("Renders text - all optional props", async () => {
    const rendered = await render(
      <Text
        as="h1"
        color="purple"
        size="lg"
        fontFamily="arial"
        fontWeight="bold"
      >
        Test
      </Text>,
    );

    expect(rendered.jsonValue).toStrictEqual({
      id: "root",
      type: "text",
      value: "Test",
      as: "h1",
      color: "purple",
      size: "lg",
      fontFamily: "arial",
      fontWeight: "bold",
    });
  });
});
