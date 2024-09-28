import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { GameDto } from "../pages/Home/data";
import { getGamesByIds } from "../pages/Me/data";

export type GameDownloadMetadata = {
  total: number;
  downloaded: number;
  status: "starting" | "paused" | "running" | "completed";
};

export type SubiscriberCallback = (
  state: GameDownloadMetadata | undefined
) => void;

export type AllSubiscriberState = [GameDto["id"], GameDownloadMetadata];
export type AllSubiscriberCallback = (state: AllSubiscriberState[]) => void;

export class GameDownloader {
  downloads = new Map<GameDto["id"], GameDownloadMetadata>();
  subiscribers = new Map<GameDto["id"], SubiscriberCallback>();
  allSubiscribers = new Set<AllSubiscriberCallback>();
  downloadSpeed = 1000000;

  private defaultMetadata(game: GameDto): GameDownloadMetadata {
    return {
      status: "starting",
      total: game.size,
      downloaded: 0,
    };
  }

  public progress(game: GameDto) {
    return `${(this.numericProgress(game) * 100).toFixed(2)}%`;
  }

  public numericProgress(game: GameDto) {
    const metadata = this.downloads.get(game.id);
    if (!metadata) {
      return 0;
    }

    return metadata.downloaded / metadata.total;
  }

  public allSubscribe(callback: AllSubiscriberCallback) {
    this.allSubiscribers.add(callback);
  }

  public allUnsubscribe(callback: AllSubiscriberCallback) {
    this.allSubiscribers.add(callback);
  }

  public subscribe(id: GameDto["id"], callback: SubiscriberCallback) {
    this.subiscribers.set(id, callback);
  }

  public unSubscribe(id: GameDto["id"]) {
    this.subiscribers.delete(id);
  }

  public async act(game: GameDto) {
    const gameDownload = this.downloads.get(game.id);
    if (gameDownload)
      switch (gameDownload.status) {
        case "running":
        case "starting": {
          this.pause(game, gameDownload);
          return;
        }
        case "completed": {
          return;
        }
      }

    this.play(game, gameDownload);

    if (!gameDownload) {
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }

    this.setPartial(game, { status: "running" });
    this.downloadTick(game);
  }

  private play(game: GameDto, defaultMetadata?: GameDownloadMetadata) {
    const metadata = ((): GameDownloadMetadata => {
      if (defaultMetadata) {
        return {
          ...defaultMetadata,
          status: "running",
        };
      } else {
        return this.defaultMetadata(game);
      }
    })();

    this.set(game, metadata);
  }

  private pause(game: GameDto, metadata: GameDownloadMetadata) {
    this.set(game, { ...metadata, status: "paused" });
  }

  private set(game: GameDto, metadata: GameDownloadMetadata) {
    this.downloads.set(game.id, metadata);
    this.notify(game.id);
  }

  private setPartial(
    game: GameDto,
    partialMetadata: Partial<GameDownloadMetadata>
  ) {
    const metadata = this.downloads.get(game.id);
    if (!metadata) {
      throw new Error("setPartial can only be called on already defined games");
    }

    this.set(game, {
      ...metadata,
      ...partialMetadata,
    });
  }

  private notify(id: GameDto["id"]) {
    this.subiscribers.get(id)?.(this.downloads.get(id));
    const allGames = this.allGamesState();

    this.allSubiscribers.forEach((callBack) => {
      callBack(allGames);
    });
  }

  public allGamesState() {
    return Array.from(this.downloads).map(
      ([game, metadata]): AllSubiscriberState => {
        return [game, metadata];
      }
    );
  }

  private async downloadTick(game: GameDto) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const metadata = this.downloads.get(game.id);
    if (!metadata || metadata.status === "paused") {
      return;
    }

    this.setPartial(game, {
      downloaded: Math.min(
        metadata.downloaded + this.downloadSpeed,
        metadata.total
      ),
    });

    if (this.isGameDownloaded(game)) {
      this.setPartial(game, {
        status: "completed",
      });
      return;
    }

    await this.downloadTick(game);
  }

  private isGameDownloaded(game: GameDto) {
    return this.numericProgress(game) === 1;
  }
}

export const GameDownloaderContext = createContext<GameDownloader | null>(null);

export function useGameDownloaderContext() {
  const downloader = useContext(GameDownloaderContext);
  if (downloader === null) throw new Error("");
  return downloader;
}

export function useGameDownloader(game: GameDto) {
  const downloader = useGameDownloaderContext();
  const [downloadMetadata, setDownloadMetadata] = useState<
    GameDownloadMetadata | undefined
  >(downloader.downloads.get(game.id));

  useEffect(() => {
    downloader.subscribe(game.id, setDownloadMetadata);

    return () => {
      downloader.unSubscribe(game.id);
    };
  }, [downloader, game.id]);

  const act = useCallback(() => {
    downloader.act(game);
  }, []);

  const progress = useCallback(() => downloader.numericProgress(game), []);

  return {
    metadata: downloadMetadata,
    act,
    progress,
  };
}

function getGamesFromAllGamesState(allSubiscriberState: AllSubiscriberState[]) {
  const gameIds = allSubiscriberState
    .filter(([, { status }]) => status === "completed")
    .map(([gameId]) => gameId);

  return getGamesByIds(gameIds);
}

export function useGamesDownloaded() {
  const downloader = useGameDownloaderContext();
  const [games, setGames] = useState<GameDto[]>(
    getGamesFromAllGamesState(downloader.allGamesState())
  );

  useEffect(() => {
    const updateGames: AllSubiscriberCallback = (newGames) => {
      setGames(getGamesFromAllGamesState(newGames));
    };

    downloader.allSubscribe(updateGames);

    return () => {
      downloader.allUnsubscribe(updateGames);
    };
  }, [downloader]);

  return games;
}
