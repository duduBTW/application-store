import { useNavigate } from "@tanstack/react-router";
import { homeRoute } from "../../App";
import { colors } from "../../theme.stylex";
import { useIsMobile } from "../../utils/useViewportType";
import { GameDto } from "./data";
import * as stylex from "@stylexjs/stylex";
import { DownloadAction } from "../Game/DownloadAction";

export function HomePage() {
  const isMobile = useIsMobile();
  const { topGames, recommendedGames } = homeRoute.useLoaderData();

  return (
    <div
      {...stylex.props(
        homePageStyles.container,
        isMobile ? homePageStyles.mobileContainer : homePageStyles.webContainer
      )}
    >
      <div>
        <h2 {...stylex.props(homePageStyles.title)}>Top games</h2>
        <GameCardsGrid games={topGames} />
      </div>
      <div>
        <h2 {...stylex.props(homePageStyles.title)}>Recommended games</h2>
        <GameCardsGrid games={recommendedGames} />
      </div>
    </div>
  );
}

const homePageStyles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 52,
  },
  webContainer: {
    padding: 52,
  },
  mobileContainer: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 1,
    marginBottom: 24,
  },
});

function HomeLoader() {
  return <div>Loading...</div>;
}

HomePage.Loader = HomeLoader;

function GameCardsGrid(props: { games: GameDto[] }) {
  return (
    <div {...stylex.props(gameCardsGridStyles.container)}>
      {props.games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

const gameCardsGridStyles = stylex.create({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
});
4;
function GameCard(props: { game: GameDto }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() =>
        navigate({
          to: "/game/$gameId",
          params: {
            gameId: props.game.id,
          },
        })
      }
      {...stylex.props(gameCardStyles.container)}
    >
      <img
        {...stylex.props(gameCardStyles.image)}
        src={props.game.image}
        alt={props.game.name}
      />
      <div {...stylex.props(gameCardStyles.rightPart)}>
        <div {...stylex.props(gameCardStyles.details)}>
          <div>
            <p {...stylex.props(gameCardStyles.primaryText)}>
              {props.game.name}
            </p>
            <p {...stylex.props(gameCardStyles.secondaryText)}>
              {props.game.studio}
            </p>
          </div>

          <DownloadAction {...props} />
        </div>
        <div {...stylex.props(gameCardStyles.divider)} />
      </div>
    </button>
  );
}

const gameCardStyles = stylex.create({
  container: {
    display: "flex",
    gap: 16,
    background: "transparent",
    textAlign: "start",
    border: "none",
  },
  image: {
    width: 52,
    height: 52,
    borderRadius: 6,
    userSelect: "none",
    pointerEvents: "none",
  },
  rightPart: {
    flex: 1,
    marginTop: 4,
  },
  details: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  price: {
    height: 24,
    minWidth: 60,
    borderRadius: 999,
    background: "white",
    color: colors.primary,
    border: "none",
    fontSize: 12,
    lineHeight: "100%",
    fontWeight: 700,
    paddingHorizontal: 12,
    display: "grid",
    placeContent: "center",
    textDecoration: "none",
  },
  divider: {
    width: "100%",
    height: 1,
    background: colors.divider,
    marginTop: 14,
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
});
