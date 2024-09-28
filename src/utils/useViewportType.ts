import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

const DEFAULT_MOBILE_WIDTH_THRESHOLD = 515;

function checkIsMobile(mobileScreenThreshold: number) {
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const isSmallScreen = window.innerWidth <= mobileScreenThreshold;
  return isMobileUserAgent || isSmallScreen;
}

export const useIsMobile = (
  mobileScreenThreshold = DEFAULT_MOBILE_WIDTH_THRESHOLD
) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleScreenSize = useCallback(() => {
    setIsMobile(checkIsMobile(mobileScreenThreshold));
  }, [mobileScreenThreshold]);

  const debouncedHandleScreenSize = useDebounce(handleScreenSize, 100);

  useEffect(() => {
    handleScreenSize();
    window.addEventListener("resize", debouncedHandleScreenSize);

    return () => {
      window.removeEventListener("resize", debouncedHandleScreenSize);
    };
  }, [debouncedHandleScreenSize, handleScreenSize]);

  return isMobile;
};
