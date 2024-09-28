import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./Layout/Layout";
import { HomePage } from "./pages/Home/Home";
import { fetchTopGames, fetchRecommendedGames } from "./pages/Home/data";
import { GamePage } from "./pages/Game/Game";
import { fetchGame } from "./pages/Game/data";
import { SearchPage } from "./pages/Search/Search";
import { searchForGames } from "./pages/Search/data";
import { MePage } from "./pages/Me/Me";

const rootRoute = createRootRoute();

const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: Layout,
  id: "layout",
  pendingComponent: () => <div>...</div>,
});

export const homeRoute = createRoute({
  getParentRoute: () => storeRoute,
  loader: async () => {
    const [topGames, recommendedGames] = await Promise.all([
      fetchTopGames(),
      fetchRecommendedGames(),
    ]);

    return { topGames, recommendedGames };
  },
  path: "/",
  component: HomePage,
  pendingComponent: HomePage.Loader,
});

export const gameRoute = createRoute({
  getParentRoute: () => storeRoute,
  path: "/game/$gameId",
  loader: async ({ params }) => await fetchGame(params.gameId),
  component: GamePage,
  pendingComponent: GamePage.Loader,
});

export const meRoute = createRoute({
  getParentRoute: () => storeRoute,
  path: "/me",
  component: MePage,
});

export const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
  loader: async ({ deps }) => {
    const query = (deps as { value: string }).value;

    return searchForGames(query);
  },
  loaderDeps: ({ search: { value } }) => {
    return { value };
  },
  validateSearch: (search: Record<string, unknown>) => {
    return {
      value: (search.value as string) || "",
    };
  },
});

const routeTree = rootRoute.addChildren([
  storeRoute.addChildren([homeRoute, gameRoute, meRoute]),
  searchRoute,
]);
const router = createRouter({ routeTree });

export default router;
