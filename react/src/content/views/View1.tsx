import React from "react";
import { Action } from "../../assets/action";
import { Collection } from "../../assets/collection";
import { Input } from "../../assets/input";
import { StackedView } from "../../assets/stacked-view";
import { Text } from "../../assets/text";
import { VIEWS_IDS } from "../../constants";
import { bindings } from "../schema";

const View1 = (
  <StackedView id={VIEWS_IDS.VIEW_1}>
    <StackedView.Header>
      <Text as="h1" size="xl" fontWeight="bold">
        View 1
      </Text>
    </StackedView.Header>
    <StackedView.Main>
      <Collection>
        <Collection.Values>
          <Input binding={bindings.userData.name}>
            <Input.Label>Name</Input.Label>
          </Input>
          <Input binding={bindings.userData.age}>
            <Input.Label>Age</Input.Label>
          </Input>
        </Collection.Values>
      </Collection>
    </StackedView.Main>
    <StackedView.Footer>
      <Action value={VIEWS_IDS.VIEW_2}>
        <Action.Label>
          <Text as="b">Next</Text>
        </Action.Label>
      </Action>
    </StackedView.Footer>
  </StackedView>
);

export default View1;
