import { KEYS, ALPHABET } from "@/constants/game";
// import { Statistics } from "@/types/statistics";
import { Dispatch, SetStateAction } from "react";


const setInputNormal = (
  inputKey: string, 
  // activeInfo: ActiveInfo,
  setters: Array<Dispatch<SetStateAction<string[]>>>,
  // setInputValue: (f: SetStateAction<string[]>) => void,
) => {
  const setInputValue = ((words: string[]) => {
    const activeWordIdx = words.length - 1;
    const activeLetterIdx = words[activeWordIdx].length;

    if (inputKey == KEYS.BACKSPACE) {
      if (activeWordIdx === 0 && activeLetterIdx === 0)
        return [""];

      const lastWord = words[words.length - 1];
      const newWords = words.slice(0, -1);

      if (activeLetterIdx > 0)
        return [...newWords, lastWord.slice(0, -1)];
      return newWords;

    } else if (inputKey === KEYS.SPACE) {
      if (activeLetterIdx === 0) 
        return words;
      return [...words, ""]

    } else if (ALPHABET.test(inputKey)) {
      const newWords = [...words];
      newWords[newWords.length - 1] += inputKey;
      return newWords;

    } else {
      return words;
    }
  });

  setters.forEach(setter => setter(setInputValue));
}

export default setInputNormal;