import * as stylex from "@stylexjs/stylex";
import { useRouter } from "@tanstack/react-router";
import { searchRoute } from "../../App";
import { GameDto } from "../Home/data";
import { useEffect, useState } from "react";
import { colors } from "../../theme.stylex";
import { useDebounce } from "../../utils/useDebounce";
import { DownloadAction } from "../Game/DownloadAction";
import { useIsMobile } from "../../utils/useViewportType";
import { UserAvatar } from "../../Layout/Layout";
import { useReadingHistory } from "../../utils/readingHistory";

export function SearchPage() {
  const [isScrolling, setIsScrolling] = useState(false);

  const isMobile = useIsMobile();
  const router = useRouter();
  const readingHistory = useReadingHistory();
  const searchItems = searchRoute.useLoaderData();
  const { value: searchValue } = searchRoute.useSearch();
  const [value, setValue] = useState(searchValue);

  const setSearchValue = useDebounce((value: string) => {
    router.navigate({
      to: "/search",
      search: {
        value,
      },
    });
  }, 400);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 16);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setValue(searchValue);
    readingHistory.push(searchValue);
  }, [searchValue, readingHistory.push]);

  return (
    <div>
      <div {...stylex.props(styles.nav, isScrolling && styles.navScrolling)}>
        <button
          {...stylex.props(styles.backIcon)}
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            document.startViewTransition(() => router.history.back());
          }}
        >
          <i className="fa-solid fa-arrow-left" />
        </button>
        <div
          {...stylex.props(
            styles.inputContainer,
            !isMobile && styles.inputContainerWeb
          )}
        >
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setSearchValue(e.target.value);
            }}
            {...stylex.props(styles.input)}
            type="text"
            autoFocus
            placeholder="Search..."
          />
        </div>
        <UserAvatar />
      </div>
      {searchValue && (
        <h2 {...stylex.props(styles.title)}>Results for "{searchValue}"</h2>
      )}

      <div
        {...stylex.props(
          styles.searchItemsGrid,
          isMobile ? styles.searchItemsGridMobile : styles.searchItemsGridWeb
        )}
      >
        {searchItems.length <= 0 ? (
          <div
            {...stylex.props(
              styles.readingHistory,
              !isMobile && styles.readingHistoryWeb
            )}
          >
            <div {...stylex.props(styles.readingHistoryHeader)}>
              <h3 {...stylex.props(styles.readingHistoryTitle)}>
                Search history
              </h3>

              <div {...stylex.props(styles.spacer)} />
              <i className="fa-solid fa-clock-rotate-left" />
            </div>
            {readingHistory.get()?.map((historyItem) => (
              <button
                onClick={() => setSearchValue(historyItem)}
                {...stylex.props(styles.readingHistoryItem)}
              >
                {historyItem}
              </button>
            ))}
          </div>
        ) : (
          searchItems.map((game) => (
            <SearchGameItem key={game.id} game={game} />
          ))
        )}
      </div>
    </div>
  );
}

const styles = stylex.create({
  spacer: {
    flex: 1,
  },
  nav: {
    "view-transition-name": "nav",
    position: "sticky",
    top: 0,
    height: 48,
    display: "flex",
    alignItems: "center",
    paddingStart: 16,
    paddingEnd: 16,
    borderBottom: "1px solid transparent",
  },
  navScrolling: {
    background: colors.headerBg,
    backdropFilter: "blur(10px)",
    borderBottomColor: colors.primaryDark,
  },
  input: {
    boxSizing: "border-box",
    border: "none",
    borderRadius: "8px",
    fontSize: 12,
    lineHeight: 1,
    height: 26,
    paddingInline: 14,
    outline: "none",
    width: "100%",
  },
  inputContainer: {
    flex: 1,
    marginLeft: 24,
  },
  inputContainerWeb: {
    maxWidth: 240,
    marginLeft: "auto",
  },
  title: {
    margin: 0,
    padding: 16,
    fontWeight: 500,
  },
  searchItemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(minmax(420px, 100%), 1fr))",
    gap: 40,
  },
  searchItemsGridWeb: {
    paddingHorizontal: 52,
    paddingVertical: 32,
  },
  searchItemsGridMobile: {
    padding: 16,
  },
  backIcon: {
    background: "transparent",
    border: "none",
    fontSize: "14px",
    borderRadius: 22,
    width: 32,
    height: 32,
    margin: -8,
    ":hover": {
      background: colors.hover,
    },
  },
  readingHistory: {
    display: "flex",
    flexDirection: "column",
    userSelect: "none",
  },
  readingHistoryWeb: {
    maxWidth: 600,
    width: "100%",
    margin: "0px auto",
    borderRadius: 8,
    padding: 8,
    border: "1px solid transparent",
    borderColor: colors.divider,
  },
  readingHistoryItem: {
    fontSize: 14,
    padding: 8,
    borderRadius: 4,
    background: "transparent",
    border: "none",
    textAlign: "start",
    ":hover": {
      background: colors.hover,
    },
  },
  readingHistoryHeader: {
    display: "flex",
    fontSize: 12,
    lineHeight: 1,
    padding: 4,
    paddingBottom: 8,
    marginBottom: 4,
    borderBottom: "1px solid transparent",
    borderBottomColor: colors.divider,
    color: colors.fontSeconday,
  },
  readingHistoryTitle: {
    fontWeight: 500,
    fontSize: "inherit",
  },
});

function SearchGameItem(props: { game: GameDto }) {
  const minuature = props.game.gallery?.[0];
  const [hideMiniature, setHideMiniature] = useState(
    typeof minuature === "undefined"
  );

  return (
    <div {...stylex.props(searchGameStyles.container)}>
      <div {...stylex.props(searchGameStyles.header)}>
        <img
          {...stylex.props(searchGameStyles.miniature)}
          src={props.game.image}
          alt=""
        />
        <div {...stylex.props(searchGameStyles.detials)}>
          <p {...stylex.props(searchGameStyles.primaryText)}>
            {props.game.name}
          </p>
          <p {...stylex.props(searchGameStyles.secondaryText)}>
            {props.game.studio}
          </p>
        </div>

        <DownloadAction {...props} />
      </div>

      {!hideMiniature && (
        <img
          onError={() => {
            setHideMiniature(true);
          }}
          {...stylex.props(searchGameStyles.gallleryImage)}
          loading="lazy"
          src={minuature}
          alt=""
        />
      )}
    </div>
  );
}

const searchGameStyles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },
  header: {
    width: "100%",
    display: "flex",
    gap: 16,
  },
  miniature: {
    borderRadius: 6,
    width: 48,
    height: 48,
  },
  gallleryImage: {
    maxWidth: "515px",
    width: "calc(100% - 32px)",
    borderRadius: 4,
  },
  detials: {
    flex: 1,
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
