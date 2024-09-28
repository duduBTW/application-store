import { forwardRef } from "react";
import { colors } from "../../theme.stylex";
import * as stylex from "@stylexjs/stylex";

// export function Button(
// props: React.ComponentProps<"button"> & {
//   styles?: stylex.StyleXStyles;
// }
// ) {
//   return <button {...props} {...stylex.props(styles.button, props.styles)} />;
// }

type Props = React.ComponentProps<"button"> & {
  styles?: stylex.StyleXStyles;
};

export const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      {...props}
      {...stylex.props(styles.button, props.styles)}
      ref={ref}
    />
  );
});

const styles = stylex.create({
  button: {
    height: 20,
    minWidth: 64,
    width: "min-content",
    borderRadius: 999,
    background: "white",
    color: colors.primary,
    border: "none",
    fontSize: 11,
    lineHeight: "100%",
    fontWeight: 700,
    paddingHorizontal: 12,
    display: "grid",
    placeContent: "center",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
});
