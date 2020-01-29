export default interface CardModel {
  name:
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
  stamp: 'Red' | 'Blue';
  image: string;
  color: string;
  moves: number[][];
}
