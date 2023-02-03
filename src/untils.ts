import "whatwg-fetch";
import { getSelectedSquare } from "./getSelectedSquare";

export const letters: Array<string> = [
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

export const doFetch = (endPoint: string) => {
  return fetch(endPoint)
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        return { data };
      }

      const error = {
        error: new Error(),
        message: `ERROR - ${response.statusText} error has occured`,
        response: response,
      };
      return { error };
    })
    .catch((error) => {
      console.error({ error });
    });
};

export const getRandomIndex = (array: Array<any>) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

export const placeWord = (word: string, clone: Array<any>, size: number) => {
  const availablePlaces: Array<any> = getSquaresWithEnoughSpaces(
    clone,
    word.length
  );

  const results: Array<any> = getSelectedSquare(
    clone,
    availablePlaces,
    word.toLocaleLowerCase(),
    size
  );

  const selectedArray = getRandomIndex(results);

  clone.forEach((item) => {
    if (selectedArray) {
      const result = selectedArray.find(({ id }: any) => item.id === id);
      if (result) {
        item.letter = result.letter;
      }
    }
  });
};
