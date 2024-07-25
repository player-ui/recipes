import {
  Flow,
  type ReactPlayerOptions,
  useReactPlayer,
} from "@player-ui/react";
import { AssetsRegistryPlugin } from "./assets";
import { Suspense, useEffect } from "react";
import flow from "./generated/index.json";

const config: ReactPlayerOptions = {
  plugins: [new AssetsRegistryPlugin()],
};

function App() {
  const { reactPlayer } = useReactPlayer(config);

  useEffect(() => {
    // casting due to an issue with schema not generating the ROOT type:
    reactPlayer.start(flow as unknown as Flow);
  }, [reactPlayer]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <reactPlayer.Component />
    </Suspense>
  );
}

export default App;
