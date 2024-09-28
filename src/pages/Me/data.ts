import { GameDto, games } from "../Home/data";

export function getGamesByIds(ids: GameDto["id"][]) {
  const result: GameDto[] = [];

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];

    const game = games.find((game) => game.id === id);
    if (!game) {
      continue;
    }

    result.push(game);
  }

  return result;
}
