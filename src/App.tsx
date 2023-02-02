import React from "react";
import uuid from "react-uuid";

function App() {
  const squareSize = 50;
  const wrapperSize = 250;
  const numberOfSquarePerRow = wrapperSize / squareSize;
  const numberOfSquaresTotal = numberOfSquarePerRow * numberOfSquarePerRow;

  const letterArray = Array.apply(null, Array(numberOfSquaresTotal));

  let id = 0;
  let cols = 0;
  let rows = 0;
  const num = 5;

  const flatArray = letterArray.map((item, index) => {
    let temp = 0;
    if (cols <= rows) {
      temp = num - rows;
    } else if (cols > rows) {
      temp = num - cols;
    }

    const obj = {
      id: id,
      horizontal: num - cols,
      vertical: num - rows,
      diagonal: temp,
      letter: "",
    };

    id++;
    cols++;
    if (cols >= 5) {
      cols = 0;
      rows++;
    }
    return obj;
  });

  const word = "shit";

  const wordArray = word.split("");

  //returns all squares that have a directionavailable that can hold the word.
  const availablePlaces = flatArray.filter((item) => {
    if (
      item.horizontal === word.length ||
      item.vertical === word.length ||
      item.diagonal === word.length
    ) {
      return item;
    }
  });

  //select one of the available squares at random
  const randomIndex = Math.floor(Math.random() * availablePlaces.length);
  const selectedSquare = availablePlaces[randomIndex];
  const availableDirections: Array<string> = [];

  //loop through the diractions available in the selected square
  for (const [key, value] of Object.entries(selectedSquare)) {
    if (key !== "id") {
      if (value === word.length) {
        availableDirections.push(key);
      }
    }
  }

  //select one of the directions at random
  const randomDirectionIndex = Math.floor(
    Math.random() * availableDirections.length
  );
  const selectedDirection = availableDirections[randomDirectionIndex];
  let count = selectedSquare.id;
  wordArray.forEach((item, index) => {
    flatArray[count].letter = wordArray[index];
    if (count <= flatArray.length) {
      if (selectedDirection === "horizontal") {
        count++;
      } else if (selectedDirection === "vertical") {
        count = count + 5;
      } else {
        count = count + 6;
      }
    }
  });

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className={`bg-green-200 flex flex-wrap w-[250px]`}>
        {flatArray.map((item, index) => {
          return (
            <div
              key={uuid()}
              className="bg-gray-400 border-yellow-50 border-2 w-[50px] h-[50px] flex justify-center items-center uppercase"
            >
              {item.letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
