/**
 * Represents the active information of a word and letter.
 * 
 * @property word - An object containing the index and length of the word.
 * @property word.idx - The index of the word.
 * @property word.length - The length of the word.
 * @property letter - An object containing the index of the letter.
 * @property letter.idx - The index of the letter.
 */
export type ActiveInfo = {
  word: {idx: number, length: number},
  letter: {idx: number}
}

/**
 * Represents the status of a box range.
 * 
 * @property firstIdx - The index of the first element in the range.
 * @property lastIdx - The index of the last element in the range.
 * @property isFull - A boolean indicating whether the range is full.
 */
export type BoxRangeStatus = {
  firstIdx: number,
  lastIdx: number,
  isFull: boolean
}