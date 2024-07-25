import { ReactAsset } from "@player-ui/react";
import { CollectionAsset } from "../types";

export const CollectionComponent = (props: CollectionAsset) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {props.values?.map((value) => (
        <span key={value.asset.id}>
          <ReactAsset {...value.asset} />
        </span>
      ))}
    </div>
  );
};
