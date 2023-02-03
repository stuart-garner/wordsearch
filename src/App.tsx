import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import randomWords from "random-words";

import {
  doFetch,
  getSelectedSquare,
  getSquaresWithEnoughSpaces,
  setUpGrid,
} from "./untils";

const App = () => {
  const [squareSize, setSquareSize] = useState(50);
  const [gridSize, setGridSize] = useState(10);
  const [words, setWords] = useState<Array<string>>([]);
  const [squares, setSquares] = useState<Array<any>>(setUpGrid(gridSize));

  const letters: Array<string> = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const clone: Array<any> = [...squares];

  const placeWord = (word: string) => {
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

    clone.forEach((item) => {
      if (selectedArray) {
        const result = selectedArray.find(({ id }: any) => item.id === id);
        if (result) {
          item.letter = result.letter;
        }
      }
    });

    //
  };

  const getRandomLetter = () => {
    const random = Math.floor(Math.random() * letters.length);
    return letters[random];
  };

  useEffect(() => {
    /*
    doFetch(
      "https://random-word-api.herokuapp.com/word?number=10&length=5"
    ).then(({ data }: any) => {
      setWords(data);
    });
    */
    setWords(randomWords(2));
  }, [null]);

  useEffect(() => {
    words.forEach((item) => {
      placeWord(item);
    });
    setSquares(clone);
  }, [words]);

  const refresh = () => {};

  const width = squareSize * gridSize;
  return (
    <div className="h-screen w-screen flex justify-center items-center gap-10 ">
      <div className={`bg-green-200 flex flex-wrap`} style={{ width: width }}>
        {squares.map((item, index) => {
          return (
            <div
              key={uuid()}
              style={{ width: squareSize, height: squareSize }}
              className={`${
                item.letter === "" ? "bg-gray-400" : "bg-yellow-600"
              } border-yellow-50 border-2 flex justify-center items-center uppercase`}
            >
              {item.letter === "" ? getRandomLetter() : item.letter}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <ul>
            {words.map((word) => {
              return (
                <li className="capitalize" key={word}>
                  {word}
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={refresh}
          className="mt-5 bg-gray-400 py-2 px-5 rounded-md"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default App;
