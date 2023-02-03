import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import randomWords from "random-words";

import { doFetch, getRandomIndex, letters, placeWord } from "./untils";
import { setUpGrid } from "./setUpGrid";

const App = ({ gridSize = 15, squareSize = 40 }: any) => {
  const [words, setWords] = useState<Array<string>>([]);
  const [squares, setSquares] = useState<Array<any>>(setUpGrid(gridSize));

  useEffect(() => {
    /*
    doFetch(
      "https://random-word-api.herokuapp.com/word?number=10&length=5"
    ).then(({ data }: any) => {
      setWords(data);
    });
    */
    setWords(randomWords(gridSize));
  }, [null]);

  useEffect(() => {
    const clone: Array<any> = [...squares];
    words.forEach((item) => {
      placeWord(item, clone, gridSize);
    });
    setSquares(clone);
  }, [words]);

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
              } border-gray-500 border-dotted border-[1px] flex justify-center items-center uppercase`}
            >
              {item.letter === "" ? getRandomIndex(letters) : item.letter}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <ul>
            {words.map((word) => {
              return (
                <li className="capitalize" key={uuid()}>
                  {word}
                </li>
              );
            })}
          </ul>
        </div>
        <button
          onClick={() => null}
          className="mt-5 bg-gray-400 py-2 px-5 rounded-md"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default App;
