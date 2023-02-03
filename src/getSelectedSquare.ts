export const getSelectedSquare = (
  squares: Array<any>,
  availablePlaces: Array<any>,
  word: string,
  gridSize: number
) => {
  const wordArray = word.split("");
  const results: Array<any> = [];
  availablePlaces.forEach((item) => {
    for (const [key, value] of Object.entries<any>(item)) {
      if (key !== "id") {
        if (value >= word.length) {
          let count = item.id;

          let arr: Array<any> = [];
          wordArray.forEach((letter, index) => {
            if (
              squares[count].letter === "" ||
              squares[count].letter === letter
            ) {
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
