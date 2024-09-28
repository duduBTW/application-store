import { games } from "../Home/data";

export async function fetchGame(gameId: string) {
  return games.find((game) => game.id === gameId);
}
