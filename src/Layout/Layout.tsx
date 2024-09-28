import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../theme.stylex";
import { useIsMobile } from "../utils/useViewportType";
import { useState } from "react";
import { icon } from "../utils/icon";

function Layout() {
  const isMobile = useIsMobile();

  return (
    <div>
      <div {...stylex.props(layoutStyles.header)}>
        <Nav />
        {isMobile && <Navigator />}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const layoutStyles = stylex.create({
  container: {},
  header: {
    "view-transition-name": "nav",
    position: "sticky",
    top: 0,
    background: colors.headerBg,
  },
});

function Nav() {
  const isMobile = useIsMobile();
  const isWeb = !isMobile;

  return (
    <nav {...stylex.props(navStyles.container)}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/512px-App_Store_%28iOS%29.svg.png"
        {...stylex.props(navStyles.logo)}
      />

      {isWeb && <Navigator />}
      {isWeb ? <DesktopSearch /> : <MobileSearch />}
      <UserAvatar />
    </nav>
  );
}

export function UserAvatar() {
  return (
    <Link to="/me">
      <img
        src="https://styles.redditmedia.com/t5_pgtle/styles/profileIcon_vaa8mon7atx21.jpg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=59924838f0ef635552615b10d17a5827faf97903"
        {...stylex.props(navStyles.avatar)}
      />
    </Link>
  );
}

function Navigator() {
  return (
    <div {...stylex.props(navigatorStyles.container)}>
      <Link {...stylex.props(navigatorStyles.item)} to="/">
        Home
      </Link>{" "}
      <Link to="/game/100" {...stylex.props(navigatorStyles.item)}>
        Desktop
      </Link>
      <Link to="/game/100" {...stylex.props(navigatorStyles.item)}>
        Mobile
      </Link>
      <Link to="/game/100" {...stylex.props(navigatorStyles.item)}>
        TV
      </Link>
    </div>
  );
}

const navStyles = stylex.create({
  container: {
    height: 48,
    display: "flex",
    alignItems: "center",
    paddingStart: 16,
    paddingEnd: 16,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 99,
    marginLeft: 28,
  },
  logo: {
    height: 30,
    width: 30,
  },
});

const navigatorStyles = stylex.create({
  container: {
    display: "flex",
  },
  item: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginHorizontal: 4,
    marginVertical: 4,
    textAlign: "center",
    color: colors.fontPrimary,
    textDecoration: "none",
    borderRadius: 4,
    fontSize: 12,
    ":hover": {
      background: colors.hover,
    },
  },
});

function DesktopSearch() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  return (
    <form
      {...stylex.props(desktopSearchStyles.container)}
      onSubmit={(e) => {
        e.preventDefault();

        if (!value) {
          return;
        }

        navigate({ to: "/search", search: { value } });
      }}
    >
      <i
        {...stylex.props(
          desktopSearchStyles.inputIcon,
          icon("fa-solid fa-magnifying-glass")
        )}
      />
      <input
        {...stylex.props(desktopSearchStyles.input)}
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </form>
  );
}

const desktopSearchStyles = stylex.create({
  container: {
    marginInlineStart: "auto",
    position: "relative",
  },
  input: {
    boxSizing: "border-box",
    border: "none",
    borderRadius: "8px",
    fontSize: 12,
    lineHeight: 1,
    height: 26,
    paddingInline: 14,
    paddingInlineStart: 28,
    outline: "none",
    width: "100%",
    maxWidth: 212,
    transition: "max-width 0.1s ease-in-out",
    ":focus": {
      maxWidth: 252,
    },
  },
  inputIcon: {
    position: "absolute",
    zIndex: 2,
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 12,
    color: colors.fontSeconday,
  },
});

function MobileSearch() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        document.startViewTransition(() => navigate({ to: "/search" }));
      }}
      {...stylex.props(mobileSearchStyles.container)}
    >
      <i className="fa-solid fa-magnifying-glass"></i>
    </button>
  );
}

const mobileSearchStyles = stylex.create({
  container: {
    background: "transparent",
    border: "none",
    fontSize: "14px",
    borderRadius: 22,
    width: 32,
    height: 32,
    margin: -8,
    marginInlineStart: "auto",
    ":hover": {
      background: colors.hover,
    },
  },
});

export default Layout;
