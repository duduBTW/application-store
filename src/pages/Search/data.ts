import { games } from "../Home/data";

export function searchForGames(query: string) {
  const foundGames = games.filter(
    (game) => !game.name.toLowerCase().search(query.toLowerCase())
  );

  if (foundGames.length === games.length) {
    return [];
  }

  return foundGames;
}
