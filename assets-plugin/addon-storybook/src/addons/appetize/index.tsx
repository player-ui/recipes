import React from "react";
import type { API } from "@storybook/manager-api";
import { useParameter } from "@storybook/preview-api";
import { STORY_CHANGED } from "@storybook/core-events";
import {
  IconButton,
  WithTooltip,
  TooltipLinkList,
} from "@storybook/components";
import { BrowserIcon, MobileIcon } from "@storybook/icons";
import { useDispatch, useSelector } from "react-redux";
import type { StateType } from "../../redux";
import { setPlatform } from "../../redux";
import type { RenderTarget } from "../../types";

interface RenderSelectionProps {
  /** storybook api */
  api: API;
}

/** Component to show the appetize dropdown */
export const RenderSelection = ({ api }: RenderSelectionProps) => {
  const params = useParameter("appetizeTokens", {});
  const dispatch = useDispatch();

  const selectedPlatform = useSelector<StateType, RenderTarget["platform"]>(
    (state) => state.platform.platform ?? "web"
  );

  React.useEffect(() => {
    /** callback for the subscribe listener */
    const listener = () => {
      dispatch(setPlatform({ platform: "web" }));
    };

    api.getChannel()?.addListener(STORY_CHANGED, listener);

    return () => {
      api.getChannel()?.removeListener(STORY_CHANGED, listener);
    };
  }, [api, dispatch]);

  const mobilePlatforms = Object.keys(params ?? {}) as Array<"ios" | "android">;

  if (mobilePlatforms.length === 0) {
    // No keys set so don't show
    return null;
  }

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={(["web", ...mobilePlatforms] as const).map((platform) => ({
            id: platform,
            title: platform,
            onClick: () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setPlatform(platform as any);
              dispatch(setPlatform({ platform }));
              onHide();
            },
            value: platform,
            active: platform === selectedPlatform,
          }))}
        />
      )}
    >
      <IconButton title="Change the render target">
        {selectedPlatform === "web" ? <BrowserIcon /> : <MobileIcon />}
      </IconButton>
    </WithTooltip>
  );
};
