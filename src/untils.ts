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

export const getSquaresWithEnoughSpaces = (
  squares: Array<any>,
  wordLength: number
) => {
  return squares.filter((item) => {
    if (
      item.horizontal >= wordLength ||
      item.vertical >= wordLength ||
      item.diagonal >= wordLength
    ) {
      return item;
    }
  });
};

export const getSelectedSquare = (
  squares: Array<any>,
  availablePlaces: Array<any>,
  word: string,
  gridSize: number
) => {
  const wordArray = word.split("");
  const results: Array<any> = [];
  availablePlaces.forEach((item) => {
    for (const [key, value] of Object.entries(item)) {
      if (key !== "id") {
        if (value >= word.length) {
          //Orentation KEY
          // console.log("ID - ", item.id);
          // console.log("ORENTATION - ", key);
          let count = item.id;

          let arr: Array<any> = [];
          wordArray.forEach((letter, index) => {
            if (
              squares[count].letter === "" ||
              squares[count].letter === letter
            ) {
              /* console.log(
                squares[count].id,
                "EMPTY SPACE- ",
                letter,
                squares[count].letter
              );*/
              const clone = { ...squares[count] };
              clone.letter = letter;
              arr.push(clone);
              if (key === "horizontal") {
                count++;
              } else if (key === "vertical") {
                count = count + gridSize;
              } else {
                count = count + gridSize + 1;
              }
            } else {
              /* console.log(
                squares[count].id,
                "NO MATCH - ",
                letter,
                squares[count].letter
              );*/
            }
          });
          if (arr.length === wordArray.length) {
            results.push(arr);
          }
        }
      }
    }
  });

  return results;
};
