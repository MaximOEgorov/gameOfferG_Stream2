import {
  getGridSize,
  subscribe,
} from "../../../data/game.data.js";
import { Cell } from "./cell/cell.component.js";

export function GameGrid() {
  const containerElement = document.createElement("table");

/*  subscribe(() => {
    update(containerElement);
  });*/
  update(containerElement);

  return containerElement;
}
function update(containerEl) {
  const gridSize = getGridSize();

  containerEl.innerHTML = "";
  for (let y = 0; y < gridSize.rowsCount; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < gridSize.columnsCount; x++) {
      const cell = Cell(x, y);

      row.append(cell);
    }
    containerEl.append(row);
  }
}
