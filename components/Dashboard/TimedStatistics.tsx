interface TimedStatisticsProps {
  words: string[];
  inputWords: string[];
  time: number;
}

const TimedStatistics = ({ words, inputWords, time }: TimedStatisticsProps) => {

  const lastWordIdx = inputWords.length - 1;
  const lastWord = words[lastWordIdx].slice(0, inputWords[lastWordIdx].length);
  const expectedWords = words.slice(0, inputWords.length - 1).concat(lastWord);

  const correctWords = inputWords.filter((input, idx) => input === expectedWords[idx]).length;

  const totalTypedLetters = inputWords.join(" ").length;

  const correctLetters = inputWords.reduce((acc, input, wordIdx) => {
    const correctWord = expectedWords[wordIdx];
    const space = (input.length === correctWord.length && wordIdx < inputWords.length - 1) ? 1 : 0;

    input.split("").forEach((letter, letterIdx) => {
      if (letterIdx >= correctWord.length)
        return;
      if (letter === correctWord[letterIdx])
        acc++;
    });

    return acc + space;
  }, 0);

  const letterAccuracy = correctLetters / Math.max(totalTypedLetters, 1);
  const WPM = Math.round(correctLetters / 5 / time * 60);
  const rawWPM = Math.round(totalTypedLetters / 5 / time * 60);



  return (
    <div className="flex flex-col gap-4 animate-opacity-in">
      <div className="text-white text-2xl grid grid-cols-2 gap-4 font-mono">
        <div>Words: </div> <div>{inputWords.length}</div>
        <div>Correct: </div> <div>{correctWords}</div>
        <div>Incorrect: </div> <div>{inputWords.length - correctWords}</div>
        <div>Accuracy: </div> <div>{Math.round(letterAccuracy * 100)}%</div>
        <div>Raw WPM: </div> <div>{rawWPM}</div>
        <div>WPM: </div> <div>{WPM}</div>
      </div>
    </div>    
  );
}


export default TimedStatistics;