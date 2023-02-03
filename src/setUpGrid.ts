export const setUpGrid = (gridSize: number) => {
  let id = 0;
  let cols = 0;
  let rows = 0;

  const totalNumberOfSquares: number = gridSize * gridSize;
  const flatArray: Array<any> = [];

  for (let i = 0; i < totalNumberOfSquares; i++) {
    let diagonal = 0;
    if (cols <= rows) {
      diagonal = gridSize - rows;
    } else if (cols > rows) {
      diagonal = gridSize - cols;
    }

    const obj: any = {
      id: id,
      horizontal: gridSize - cols,
      vertical: gridSize - rows,
      diagonal: diagonal,
      letter: "",
    };

    id++;
    cols++;
    if (cols >= gridSize) {
      cols = 0;
      rows++;
    }
    flatArray.push(obj);
  }

  return flatArray;
};
