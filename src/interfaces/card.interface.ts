export type CardName =
  | 'Bear'
  | 'Boar'
  | 'Cobra'
  | 'Crab'
  | 'Crane'
  | 'Dog'
  | 'Dragon'
  | 'Eel'
  | 'Elephant'
  | 'Fox'
  | 'Frog'
  | 'Giraffe'
  | 'Goose'
  | 'Horse'
  | 'Iguana'
  | 'Kirin'
  | 'Mantis'
  | 'Monkey'
  | 'Mouse'
  | 'Otter'
  | 'Ox'
  | 'Panda'
  | 'Phoenix'
  | 'Rabbit'
  | 'Rat'
  | 'Rooster'
  | 'Sable'
  | 'Sea Snake'
  | 'Tanuki'
  | 'Tiger'
  | 'Turtle'
  | 'Viper';

export default interface CardModel {
  name: CardName;
  stamp: 'Blue' | 'Red';
  image: string;
  color: string;
  moves: number[][];
  miniBoard: string[][];
}
