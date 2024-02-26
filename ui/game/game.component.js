import { Settings } from "./settings/settings.component.js";
import { Scores } from "./scores/scores.component.js";
import { GameGrid } from "./grid/grid.component.js";

export async function Game() {
  const containerElement = document.createElement("div");

  const settingsElement = Settings();
  containerElement.append(settingsElement);

  const scoresElement = await Scores();
  containerElement.append(scoresElement);

  const gridElement = await GameGrid();
  containerElement.append(gridElement);

  return containerElement;
}
