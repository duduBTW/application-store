import { gameRoute } from "../../App";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../theme.stylex";
import React from "react";
import { useIsMobile } from "../../utils/useViewportType";
import { Gallery } from "./Gallery";
import { DownloadAction } from "./DownloadAction";

export function useIsDesktop() {
  const isLargeMobile = useIsMobile(720);
  return !isLargeMobile;
}

export function GamePage() {
  const isDesktop = useIsDesktop();
  const game = gameRoute.useLoaderData();
  if (!game) {
    return <div>404</div>;
  }

  return (
    <div {...stylex.props(gamePageStyles.container)}>
      <div
        {...stylex.props(
          gamePageStyles.header,
          isDesktop ? gamePageStyles.desktopHeader : gamePageStyles.mobileHeader
        )}
      >
        <img
          {...stylex.props(
            gamePageStyles.miniature,
            isDesktop
              ? gamePageStyles.desktopMiniatureSize
              : gamePageStyles.mobileMiniatureSize
          )}
          src={game.image}
        />

        <div {...stylex.props(gamePageStyles.headerRightPart)}>
          <div {...stylex.props(gamePageStyles.title)}>{game.name}</div>
          <div {...stylex.props(gamePageStyles.studio)}>{game.studio}</div>

          <div {...stylex.props(gamePageStyles.spacer)} />

          <DownloadAction game={game} />
        </div>
      </div>

      {isDesktop && (
        <div
          {...stylex.props(
            gamePageStyles.horizontalDivider,
            gamePageStyles.desktopStartOffset
          )}
        />
      )}

      <RatingList />
      {typeof game.gallery !== "undefined" && <Gallery images={game.gallery} />}
    </div>
  );
}

function RatingList() {
  const isDesktop = useIsDesktop();

  const ratings: Rating[] = [
    {
      content: <div>5/5</div>,
      label: "Rating",
    },
    {
      content: <div>1M +</div>,
      label: "Downloads",
    },
    {
      content: <div>T</div>,
      label: "Age",
    },
    {
      content: <div>100 MB</div>,
      label: "Size",
    },
  ];

  return (
    <div
      {...stylex.props(
        gamePageStyles.list,
        isDesktop && gamePageStyles.desktopStartOffset
      )}
    >
      {ratings.map((rating, index) => {
        const isLastItem = index === ratings.length - 1;

        return (
          <>
            <RatingCard rating={rating} />
            {!isLastItem && <RatingDivider />}
          </>
        );
      })}
    </div>
  );
}

type Rating = {
  label: string;
  content: React.ReactNode;
};

function RatingCard(props: { rating: Rating }) {
  return (
    <div {...stylex.props(gamePageStyles.item)}>
      <div {...stylex.props(gamePageStyles.itemLabel)}>
        {props.rating.label}
      </div>
      <div {...stylex.props(gamePageStyles.itemValue)}>
        {props.rating.content}
      </div>
    </div>
  );
}

function RatingDivider() {
  return <div {...stylex.props(gamePageStyles.ratingDivider)} />;
}

const gamePageStyles = stylex.create({
  container: {},
  spacer: { flex: 1 },
  header: {
    display: "flex",
    gap: 24,
  },
  headerRightPart: {
    display: "flex",
    flexDirection: "column",
  },
  desktopHeader: {
    paddingHorizontal: 28,
    paddingTop: 52,
  },
  mobileHeader: {
    padding: 16,
  },
  miniature: {
    borderRadius: 6,
  },
  mobileMiniatureSize: {
    width: 82,
    height: 82,
  },
  desktopMiniatureSize: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 22,
    lineHeight: 1,
    fontWeight: 700,
    userSelect: "none",
    color: colors.fontPrimary,
  },
  studio: {
    fontSize: 14,
    lineHeight: 1,
    color: colors.fontSeconday,
    userSelect: "none",
    marginTop: 8,
  },
  getButton: {
    marginTop: "auto",
    minWidth: 72,
  },
  list: {
    display: "flex",
    alignItems: "center",
    overflowX: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  item: {
    flex: 1,
    minWidth: 132,
    paddingVertical: 16,
    paddingHorizontal: 24,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  itemLabel: {
    fontSize: 14,
    lineHeight: 1,
    color: colors.fontSeconday,
  },
  itemValue: {
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 700,
    color: colors.fontPrimary,
  },
  ratingDivider: {
    height: 28,
    width: 1,
    background: colors.divider,
    flexShrink: 0,
  },
  horizontalDivider: {
    height: 1,
    background: colors.divider,
    flexShrink: 0,
    marginTop: 16,
  },
  desktopStartOffset: {
    marginStart: 154,
  },
});

function GamePageLoader() {
  return <div>Loading...</div>;
}

GamePage.Loader = GamePageLoader;
