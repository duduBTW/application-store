import React from "react";
import ReactDOM from "react-dom/client";
import router from "./App.tsx";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import {
  GameDownloader,
  GameDownloaderContext,
} from "./utils/gameDownloader.ts";

export function getRootElement() {
  return document.getElementById("root")!;
}

const gameDownloader = new GameDownloader();

ReactDOM.createRoot(getRootElement()).render(
  <React.StrictMode>
    <GameDownloaderContext.Provider value={gameDownloader}>
      <RouterProvider router={router} />
    </GameDownloaderContext.Provider>
  </React.StrictMode>
);
