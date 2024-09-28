import * as stylex from "@stylexjs/stylex";
import { createPortal } from "react-dom";
import { getRootElement } from "../main";
import { colors } from "../theme.stylex";

export function MobileSearchOverlay() {
  return createPortal(
    <div {...stylex.props(styles.container)}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur,
      officiis?
    </div>,
    getRootElement()
  );
}

const styles = stylex.create({
  container: {
    position: "sticky",
    top: 0,
    background: colors.headerBg,
  },
});
