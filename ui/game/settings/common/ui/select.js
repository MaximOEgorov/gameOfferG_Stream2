export function renderSelect(elements, defaultValue) {
  const select = document.createElement("select");

  elements.forEach((element, index) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(element.data);
    option.text = element.name;
    select.appendChild(option);
    if (option.value === JSON.stringify(defaultValue?.data)) {
      select.selectedIndex = index;
    }
  });
  return select;
}
