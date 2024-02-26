import {
  getGridSize,
  subscribe,
} from "../../../data.adapter.js";
import { Cell } from "./cell/cell.component.js";

export async function GameGrid() {
  const containerElement = document.createElement("table");

/*  subscribe(() => {
    update(containerElement);
  });*/
  await update(containerElement);

  return containerElement;
}
async function update(containerEl) {
  const gridSize = await getGridSize();

  containerEl.innerHTML = "";
  for (let y = 0; y < gridSize.rowsCount; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < gridSize.columnsCount; x++) {
      const cell = await Cell(x, y);

      row.append(cell);
    }
    containerEl.append(row);
  }
}
