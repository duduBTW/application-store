import { useCallback } from "react";

const READING_HISTORY_LOCAL_STORAGE_KEY = "reading_history__";

function parseHistoryValue(value: string | null): undefined | string[] {
  if (!value) {
    return;
  }

  const rawJson = JSON.parse(value);
  if (!Array.isArray(rawJson)) {
    return;
  }

  const result: string[] = [];
  for (let i = 0; i < rawJson.length; i++) {
    const historyAnyItem = rawJson[i];

    if (typeof historyAnyItem === "string") {
      result.push(historyAnyItem);
    }
  }

  return result;
}

export function useReadingHistory() {
  const get = useCallback(() => {
    return parseHistoryValue(
      window.localStorage.getItem(READING_HISTORY_LOCAL_STORAGE_KEY)
    );
  }, []);

  const push = useCallback(
    (searchTerm: string) => {
      if (!searchTerm.trim()) {
        return;
      }

      const currentHistory = get() ?? [];

      window.localStorage.setItem(
        READING_HISTORY_LOCAL_STORAGE_KEY,
        JSON.stringify([searchTerm, ...currentHistory])
      );
    },
    [get]
  );

  return { push, get } as const;
}
