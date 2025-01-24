/**
 * Represents statistics information with timing details.
 * 
 * @property {number} totalTypedLetters - The total number of letters typed.
 * @property {number} correctLetters - The number of correctly typed letters.
 * @property {number} totalLetters - The total number of letters in the text.
 * @property {number} time - The time taken in milliseconds.
 */
export type TimedStatisticsInfo = {
  totalTypedLetters: number;
  correctLetters: number;
  totalLetters: number;
  time: number;
}