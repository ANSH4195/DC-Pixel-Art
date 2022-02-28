function PixelArt(el, rows, cols) {
  const ROWS = rows + 1,
    COLS = cols;
  let currentColor, currentElement;

  const element = document.querySelector(el);
  setGridStyles();
  const fragment = document.createDocumentFragment();
  for (let idx1 = 0; idx1 < ROWS - 1; idx1++) {
    for (let idx2 = 0; idx2 < COLS; idx2++) {
      const newChild = document.createElement("div");
      newChild.className = "grid-item";
      newChild.dataset.position = [idx1, idx2];
      fragment.appendChild(newChild);
    }
  }
  for (let j = 0; j < COLS; j++) {
    const newChild = document.createElement("div");
    const rando = randomColor();
    newChild.className = "grid-item color-palette-item";
    newChild.dataset.position = [ROWS - 1, j];
    newChild.dataset.color = `#${rando}`;
    newChild.style.background = `#${rando}`;
    fragment.appendChild(newChild);
  }
  element.appendChild(fragment);

  element.addEventListener("click", clickHandler);

  element.addEventListener("dragover", (e) => {
    const target = e.target;
    if (target.dataset && target.dataset.position && !target.dataset.color) {
      target.style.background = currentColor;
    }
  });

  function clickHandler(e) {
    const target = e.target;
    const coord = target.dataset.position.split(",");
    if (parseInt(coord[0], 10) === ROWS - 1) {
      if (currentElement) currentElement.innerHTML = "";
      currentColor = target.dataset.color;
      currentElement = target;
      currentElement.innerHTML = "#";
    } else {
      target.style.background = currentColor;
    }
  }

  function setGridStyles() {
    element.style.gridTemplateRows = `repeat(${rows + 1}, minmax(2px, 50px))`;
    element.style.gridTemplateColumns = `repeat(${cols}, minmax(2px, 50px))`;
  }

  function randomColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
  }
}

document
  .getElementById("clear")
  .addEventListener("click", () => window.location.reload());

new PixelArt("#grid", 10, 10);
