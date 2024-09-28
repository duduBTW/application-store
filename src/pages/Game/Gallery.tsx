import { useRef, useState } from "react";
import { useIsDesktop } from "./Game";
import * as stylex from "@stylexjs/stylex";
import { colors } from "../../theme.stylex";
import { AnimatePresence, motion } from "framer-motion";

export function Gallery(props: { images: string[] }) {
  const isDesktop = useIsDesktop();
  const images = props.images;

  const scroller = useRef<HTMLDivElement>(null);

  const [hovering, setHovering] = useState(false);
  const [displayCarouselArrow, setDisplayCarouselArrow] = useState({
    left: false,
    right: false,
  });

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (event) => {
    // Checks if the use is on the start on the scrollable container
    const left = event.currentTarget.scrollLeft !== 0;

    // Checks if the use is on the end on the scrollable container
    const right = !(
      event.currentTarget.offsetWidth + event.currentTarget.scrollLeft >=
      event.currentTarget.scrollWidth
    );

    setHovering(true);
    setDisplayCarouselArrow({
      left,
      right,
    });
  };

  const moveLeft = () => moveScrollerTo(scroller.current, "left");
  const leftArrow = (
    <motion.button
      onClick={moveLeft}
      initial={{
        x: "-100%",
        opacity: 0.5,
      }}
      animate={{
        x: "0%",
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: "anticipate",
        },
      }}
      exit={{
        x: "-100%",
        opacity: 0.4,
      }}
      {...stylex.props(styles.arrow, styles.leftArrow)}
    >
      <i className="fa-solid fa-chevron-left"></i>
    </motion.button>
  );

  const moveRight = () => moveScrollerTo(scroller.current, "right");
  const rightArrow = (
    <motion.button
      initial={{
        x: "100%",
        opacity: 0.5,
      }}
      animate={{
        x: "0%",
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: "anticipate",
        },
      }}
      exit={{
        x: "100%",
        opacity: 0.4,
      }}
      onClick={moveRight}
      {...stylex.props(styles.arrow, styles.rightArrow)}
    >
      <i className="fa-solid fa-chevron-right"></i>
    </motion.button>
  );

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...stylex.props(styles.container)}
    >
      <div
        onScroll={handleScroll}
        ref={scroller}
        {...stylex.props(
          styles.gallery,
          isDesktop ? styles.spaceBeforeDesktop : styles.spaceBeforeMobile
        )}
        tabIndex={0}
      >
        {images.map((image) => (
          <div
            {...stylex.props(
              styles.imageContainer,
              isDesktop ? styles.itemWidthDesktop : styles.itemWidthMobile
            )}
          >
            <img key={image} src={image} {...stylex.props(styles.image)} />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {hovering && displayCarouselArrow.left && leftArrow}
      </AnimatePresence>
      <AnimatePresence>
        {hovering && displayCarouselArrow.right && rightArrow}
      </AnimatePresence>
    </div>
  );
}

const styles = stylex.create({
  container: {
    position: "relative",
  },
  gallery: {
    position: "relative",
    gap: 12,
    display: "flex",
    overflowX: "auto",
    paddingVertical: 16,
    scrollSnapType: "x mandatory",
    "::after": {
      content: "",
      width: "16px",
    },
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  arrow: {
    position: "absolute",
    top: 0,
    height: "100%",
    padding: 10,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    color: colors.primary,
    border: "none",
  },
  leftArrow: {
    left: 0,
    background: `linear-gradient(to right, ${colors.background} 26%, transparent)`,
  },
  rightArrow: {
    right: 0,
    background: `linear-gradient(to left, ${colors.background} 26%, transparent)`,
  },
  spaceBeforeMobile: {
    "::before": {
      content: "",
      width: "16px",
    },
  },
  spaceBeforeDesktop: {
    "::before": {
      content: "",
      minWidth: "152px",
    },
  },
  imageContainer: {
    aspectRatio: "16 / 9",
    objectFit: "cover",
    borderRadius: 6,
    scrollSnapAlign: "center",
    overflow: "hidden",
    backgroundColor: colors.headerBg,
  },
  itemWidthMobile: {
    minWidth: "calc(100vw - 32px)",
  },
  itemWidthDesktop: {
    minWidth: "calc(50vw - 77px - 32px)",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    userSelect: "none",
  },
});

/**
 *
 */
function moveScrollerTo(
  element: HTMLDivElement | null,
  direction: "left" | "right"
) {
  if (element === null) {
    return;
  }

  const imageElement = element.querySelector("img");
  if (!imageElement) {
    console.warn("`imageElement` not found on the `moveScrollerTo` function");
    return;
  }

  const imageWidth = imageElement.width;
  switch (direction) {
    case "left":
      element.scrollBy({
        left: -imageWidth,
        behavior: "smooth",
      });
      break;

    default:
      element.scrollBy({
        left: imageWidth,
        behavior: "smooth",
      });
      break;
  }
}
