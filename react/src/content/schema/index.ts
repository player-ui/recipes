import { dataTypes } from "@player-ui/common-types-plugin";
import { makeBindingsForObject } from "@player-tools/dsl";

// Here is the schema for your developer tools panel Player content.
// Any bindings should be added as a key to this record, and the value
// must be a DSLSchema. You can learn more about the schema in the
// Player documentation (https://player-ui.github.io/next/dsl/schema#basic-schema).

export const schema = {
  userData: {
    name: dataTypes.StringType,
    age: dataTypes.IntegerNNType,
    phone: dataTypes.PhoneType,
    city: dataTypes.StringType,
  },
};

// This is a record of bindings for the schema above. Instead of setting the bindings
// as strings, we leverage the template strings generated here. This way, we can ensure
// that the bindings are correct and up-to-date with the schema. For more information
// on the makeBindingsForObject function, see the Player documentation
// (https://player-ui.github.io/next/dsl/schema#using-the-schema-object-in-jsxtsx-content)
export const bindings = makeBindingsForObject(schema);
