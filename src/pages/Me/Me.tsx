import * as stylex from "@stylexjs/stylex";
import { useIsMobile } from "../../utils/useViewportType";
import { useGamesDownloaded } from "../../utils/gameDownloader";
import { GameDto } from "../Home/data";
import { colors } from "../../theme.stylex";
import { Button } from "../../components/button/Button";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";

export function MePage() {
  const isMobile = useIsMobile();
  const gamesDownloaded = useGamesDownloaded();
  const parent = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current);
    }
  }, [parent]);

  return (
    <div
      {...stylex.props(
        styles.container,
        isMobile ? styles.mobileContainer : styles.webContainer
      )}
    >
      <h1>Account</h1>

      <div ref={parent} {...stylex.props(styles.gamesContainer)}>
        {gamesDownloaded?.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
}

export function GameCard(props: { game: GameDto }) {
  return (
    <div {...stylex.props(styles.gameCard)}>
      <img {...stylex.props(styles.miniature)} src={props.game.image} />

      <div {...stylex.props(styles.details)}>
        <p {...stylex.props(styles.primaryText)}>{props.game.name}</p>
        <p {...stylex.props(styles.secondaryText)}>{props.game.studio}</p>
        <div {...stylex.props(styles.spacer)} />
        <Button>Open</Button>
      </div>
    </div>
  );
}

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  webContainer: {
    paddingHorizontal: 52,
    paddingVertical: 32,
  },
  mobileContainer: {
    padding: 16,
  },
  gamesContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  gameCard: {
    display: "flex",
    gap: 16,
  },
  primaryText: {
    fontSize: 16,
    fontWeight: 800,
    userSelect: "none",
  },
  secondaryText: {
    fontSize: 14,
    lineHeight: "20px",
    color: colors.fontSeconday,
    userSelect: "none",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  spacer: {
    flex: 1,
  },
  miniature: {
    height: 80,
    width: 80,
    borderRadius: 6,
  },
});
