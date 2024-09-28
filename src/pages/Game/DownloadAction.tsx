import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/button/Button";
import { colors } from "../../theme.stylex";
import {
  GameDownloadMetadata,
  useGameDownloader,
} from "../../utils/gameDownloader";
import { icon } from "../../utils/icon";
import { GameDto } from "../Home/data";
import * as stylex from "@stylexjs/stylex";
import { createPortal } from "react-dom";
import { getRootElement } from "../../main";
import { FocusTrap } from "../../components/focusTrap/FocusTrap";

const CIRCLE_SIZE = 28;
const STROKE_SIZE = 3;

export function DownloadAction(props: { game: GameDto }) {
  const game = props.game;

  const [installPrompt, setInstallPrompt] = useState(false);

  const downloader = useGameDownloader(game);
  if (downloader.metadata && downloader.metadata.status === "completed") {
    return (
      <div {...stylex.props(styles.istalledContainer)}>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setInstallPrompt(true);
          }}
        >
          Open
        </Button>
        <button>
          <i className="fa-regular fa-trash-can" />
        </button>
      </div>
    );
  }

  if (downloader.metadata) {
    return (
      <ProgressIndicator
        game={game}
        progress={Math.round(downloader.progress() * 100)}
        metadata={downloader.metadata}
        onAct={downloader.act}
      />
    );
  }

  if (installPrompt) {
    return (
      <InstallPrompt
        onClose={() => setInstallPrompt(false)}
        onInstall={downloader.act}
      />
    );
  }

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        setInstallPrompt(true);
      }}
    >
      {game.price ?? "Get"}
    </Button>
  );
}

const rotate = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
});

const styles = stylex.create({
  istalledContainer: {
    display: "flex",
    gap: 8,
  },
  installButton: {
    background: "green",
    color: "white",
    position: "relative",
    zIndex: 99,
  },
  installOverlay: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: 88,
    pointerEvents: "all",
  },
  downloadingContainer: {
    position: "relative",
    width: CIRCLE_SIZE + STROKE_SIZE,
    height: CIRCLE_SIZE + STROKE_SIZE,
    padding: 0,
    display: "initial",
    border: "none",
    background: "transparent",
  },
  downloadingIconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
  },
  downloadingIcon: {
    fontSize: 12,
    color: colors.primary,
    paddingTop: 1,
  },
  loadingIcon: {
    animationName: rotate,
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
});

function InstallPrompt(props: { onClose?: () => void; onInstall: () => void }) {
  const installButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      props.onClose?.();
    };

    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, []);

  return (
    <FocusTrap focusTarget={installButtonRef}>
      {createPortal(
        <div
          onClick={(e) => {
            e.stopPropagation();
            props.onClose?.();
          }}
          {...stylex.props(styles.installOverlay)}
        />,
        getRootElement()
      )}

      <Button
        ref={installButtonRef}
        onClick={(e) => {
          e.stopPropagation();
          props.onInstall?.();
        }}
        styles={styles.installButton}
      >
        Install
      </Button>
    </FocusTrap>
  );
}

function ProgressIndicator(props: {
  game: GameDto;
  metadata: GameDownloadMetadata;
  progress: number;
  onAct?: () => void;
}) {
  const id = `game-card-${props.game.id}`;
  const circunference = (2 * Math.PI * CIRCLE_SIZE) / 2;
  const distanceFromCenter = (CIRCLE_SIZE + STROKE_SIZE) / 2;
  const circleProps: React.ComponentProps<"circle"> = {
    r: CIRCLE_SIZE / 2,
    cx: distanceFromCenter,
    cy: distanceFromCenter,
    strokeWidth: STROKE_SIZE,
    fill: "transparent",
  };

  const buttonLabel = (() => {
    switch (props.metadata.status) {
      case "running":
        return "Pause the download";
      case "completed":
        return "Download completed";
      case "paused":
        return "Continue download";
      case "starting":
        return "Starting download";

      default:
        break;
    }
  })();

  const iconName = (() => {
    switch (props.metadata.status) {
      case "running":
        return "fa-pause";
      case "completed":
        return "fa-check";
      case "paused":
        return "fa-play";
      case "starting":
        return "fa-circle-notch";

      default:
        break;
    }
  })();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        props.onAct?.();
      }}
      aria-label={buttonLabel}
      id={id}
      {...stylex.props(styles.downloadingContainer)}
    >
      <span {...stylex.props(styles.downloadingIconContainer)}>
        <i
          {...stylex.props(
            styles.downloadingIcon,
            icon(`fa-solid ${iconName}`),
            props.metadata.status === "starting" && styles.loadingIcon
          )}
        />
      </span>

      <span
        aria-labelledby={id}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={props.progress}
      >
        <svg
          width={CIRCLE_SIZE + STROKE_SIZE}
          height={CIRCLE_SIZE + STROKE_SIZE}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: "rotate(-90deg)",
          }}
        >
          <circle {...circleProps} stroke={colors.headerBg} />
          <circle
            {...circleProps}
            stroke={colors.primary}
            strokeLinecap="round"
            strokeDasharray={circunference}
            strokeDashoffset={circunference * ((100 - props.progress) / 100)}
            fill="transparent"
            style={{
              transition: "stroke-dashoffset 0.1s ease",
            }}
          />
        </svg>
      </span>
    </button>
  );
}
