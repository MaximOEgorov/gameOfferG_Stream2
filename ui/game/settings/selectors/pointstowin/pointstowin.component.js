import { renderSelect } from "../../common/ui/select.js";

export function PointsToWinSelect() {
  const dataSelect = [
    { data: 20, name: 20 },
    { data: 30, name: 30 },
    { data: 40, name: 40 },
  ];
  const select = renderSelect(dataSelect);
  /*  select.onchange = () => {
    console.log("hello");
    console.log(select.value);
  }; */
  select.addEventListener("change", () => {
    console.log(select.value);
  });
  return select;
}
