import { KEYS, ALPHABET } from "@/constants/game";


const setInputNormal = (
  // words: string[],
  inputKey: string, 
  activeWordIdx: number, 
  activeLetterIdx: number,
  setInputValue: (f: (words: string[]) => string[]) => void,
) => {

  if (inputKey == KEYS.BACKSPACE) {
    if (activeWordIdx === 0 && activeLetterIdx === 0)
      return;

    setInputValue((words: string[]) => {
      const lastWord = words[words.length - 1];
      const newWords = words.slice(0, -1);

      if (activeLetterIdx > 0)
        return [...newWords, lastWord.slice(0, -1)];
      return newWords;
    });

    return;
  }

  if (inputKey === KEYS.SPACE) {
    if (activeLetterIdx === 0) 
      return;

    setInputValue((words: string[]) => {
      const newWords = [...words];
      newWords.push("");
      return newWords;
    });
  }

  if (ALPHABET.test(inputKey)) {
    setInputValue((words: string[]) => {
      const newWords = [...words];
      newWords[newWords.length - 1] += inputKey;
      return newWords;
    });
  }

}

export default setInputNormal;