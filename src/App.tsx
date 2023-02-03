import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import {
  getAvailableOrientations,
  getSelectedSquare,
  getSquaresWithEnoughSpaces,
  setUpGrid,
} from "./untils";

const App = () => {
  const [squareSize, setSquareSize] = useState(50);
  const [gridSize, setGridSize] = useState(5);
  const [squares, setSquares] = useState<Array<any>>(setUpGrid(gridSize));

  const setWord = (word: string) => {
    const availablePlaces: Array<any> = getSquaresWithEnoughSpaces(
      squares,
      word.length
    );

    const results: Array<any> = getSelectedSquare(
      squares,
      availablePlaces,
      word.toLocaleLowerCase(),
      gridSize
    );

    const randomIndex = Math.floor(Math.random() * results.length);

    const selectedArray = results[randomIndex];

    const clone: Array<any> = [...squares];

    clone.forEach((item) => {
      const result = selectedArray.find(({ id }: any) => item.id === id);
      if (result) {
        // console.log(clone);
        item.letter = result.letter;
      }
    });

    console.log(clone);
    setSquares(clone);
  };

  useEffect(() => {
    setWord("Shits");
  }, [null]);

  const refresh = () => {
    setWord("Shits");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <div className={`bg-green-200 flex flex-wrap w-[250px]`}>
        {squares.map((item, index) => {
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
      <button onClick={refresh} className="mt-5">
        REFRESH
      </button>
    </div>
  );
};

export default App;
