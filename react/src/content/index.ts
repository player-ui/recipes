import { FLOW_ID } from "../constants";
import { navigation } from "./navigation";
import { schema } from "./schema";
import { views } from "./views";

//We assemble all the pieces into the flow here:
export default {
  id: FLOW_ID,
  views,
  navigation,
  schema,
  data: {
    // TODO: make sure to update to the correct initial state
    userData: {
      name: "",
      age: 0,
      phone: "",
      city: "",
    },
  },
};
