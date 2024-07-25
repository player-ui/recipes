import { ReactAsset } from "@player-ui/react";
import type { StackedViewAsset } from "../types";

export const StackedViewComponent = (props: StackedViewAsset) => {
  const { header, main, footer } = props;

  return (
    <div
      style={{
        display: "grid",
        height: "100%",
        gap: "4px",
        gridTemplateAreas: '"header" "main" "footer"',
        width: "100%",
      }}
    >
      <div style={{ width: "100%", gridArea: "header" }}>
        {header && <ReactAsset {...header} />}
      </div>
      <div
        style={{
          width: "100%",
          maxHeight: "70vh",
          overflowX: "auto",
          overflowY: "auto",
          gridArea: "main",
        }}
      >
        {main && <ReactAsset {...main} />}
      </div>
      <div
        style={{
          width: "100%",
          overflowX: "auto",
          overflowY: "auto",
          gridArea: "footer",
        }}
      >
        {footer && <ReactAsset {...footer} />}
      </div>
    </div>
  );
};
