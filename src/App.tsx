import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import Grid from "./Grid";
import uuid from "react-uuid";

const App = () => {
  const [gridSize, setGridSize] = useState(15);

  const [{ data, loading, error }, refetch] = useAxios(
    `https://wordsearch-api.onrender.com/api/grid/${gridSize}`
  );

  if (loading) return <div>Loading</div>;
  if (error) return <div>ERROR</div>;
  if (data)
    return (
      <div className="flex gap-10 capitalize justify-center h-screen items-center">
        <div id="grid">
          <Grid data={data.grid} grigSize={gridSize} />
        </div>
        <div id="words" className="text-xl">
          <ul>
            {data.words.map(({ word }: any) => {
              return <li key={uuid()}>{word}</li>;
            })}
          </ul>
        </div>
      </div>
    );

  return null;
};

export default App;
