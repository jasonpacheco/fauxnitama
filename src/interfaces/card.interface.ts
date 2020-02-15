export type CardName =
  | 'Boar'
  | 'Cobra'
  | 'Crab'
  | 'Crane'
  | 'Dragon'
  | 'Eel'
  | 'Elephant'
  | 'Frog'
  | 'Goose'
  | 'Horse'
  | 'Mantis'
  | 'Monkey'
  | 'Ox'
  | 'Rabbit'
  | 'Rooster'
  | 'Tiger';

export default interface CardModel {
  name: CardName;
  stamp: 'Blue' | 'Red';
  image: string;
  color: string;
  moves: number[][];
  miniBoard: string[][];
}
