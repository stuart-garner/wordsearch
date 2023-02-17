import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./Grid";
import uuid from "react-uuid";

const App = () => {
  const [gridSize, setGridSize] = useState(15);
  const [grid, setGrid] = useState<any>();
  const [words, setWords] = useState<any>();
  const [isError, setIsError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [firstSquare, setFirstSquare] = useState<any>();
  const [lastSquare, setLastSquare] = useState<any>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://wordsearch-api.onrender.com/api/grid/${gridSize}`)
      .then((response) => {
        setIsLoading(false);
        setGrid(response.data.grid);
        setWords(response.data.words);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [null]);

  const onDragStart = (squ: any) => {
    console.log(squ);
    setLastSquare(null);
    setFirstSquare(squ);
  };

  const onDragStop = (squ: any) => {
    console.log(squ);
    setLastSquare(squ);
  };

  useEffect(() => {
    if (firstSquare && lastSquare) {
      const clone = [...words];
      clone.find((item: any) => {
        const itemfirstIndex = item.selectedSpace[0];
        const itemLastIndex = item.selectedSpace[item.selectedSpace.length - 1];
        if (
          itemfirstIndex === firstSquare.id &&
          itemLastIndex === lastSquare.id
        ) {
          item.found = true;
          setWords(clone);
        }
      });
    }
  }, [firstSquare, lastSquare]);

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>ERROR</div>;
  if (grid && words) {
    return (
      <div className="flex gap-10 capitalize justify-center h-screen items-center">
        <div id="grid">
          <Grid
            data={grid}
            grigSize={gridSize}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
          />
        </div>
        <div id="words" className="text-xl">
          <ul>
            {words.map(({ word, found }: any) => {
              return (
                <li key={uuid()} className={`${found ? "line-through" : ""}`}>
                  {word}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return null;
};

export default App;
