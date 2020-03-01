import BearImage from '../assets/calligraphy/bear.png';
import BoarImage from '../assets/calligraphy/boar.png';
import CobraImage from '../assets/calligraphy/cobra.png';
import CrabImage from '../assets/calligraphy/crab.png';
import CraneImage from '../assets/calligraphy/crane.png';
import DogImage from '../assets/calligraphy/dog.png';
import DragonImage from '../assets/calligraphy/dragon.png';
import EelImage from '../assets/calligraphy/eel.png';
import ElephantImage from '../assets/calligraphy/elephant.png';
import FoxImage from '../assets/calligraphy/fox.png';
import FrogImage from '../assets/calligraphy/frog.png';
import GiraffeImage from '../assets/calligraphy/giraffe.png';
import GooseImage from '../assets/calligraphy/goose.png';
import HorseImage from '../assets/calligraphy/horse.png';
import IguanaImage from '../assets/calligraphy/iguana.png';
import KirinImage from '../assets/calligraphy/kirin.png';
import MantisImage from '../assets/calligraphy/mantis.png';
import MonkeyImage from '../assets/calligraphy/monkey.png';
import MouseImage from '../assets/calligraphy/mouse.png';
import OtterImage from '../assets/calligraphy/otter.png';
import OxImage from '../assets/calligraphy/ox.png';
import PandaImage from '../assets/calligraphy/panda.png';
import PhoenixImage from '../assets/calligraphy/phoenix.png';
import RabbitImage from '../assets/calligraphy/rabbit.png';
import RatImage from '../assets/calligraphy/rat.png';
import RoosterImage from '../assets/calligraphy/rooster.png';
import SableImage from '../assets/calligraphy/sable.png';
import SeaSnakeImage from '../assets/calligraphy/sea_snake.png';
import TanukiImage from '../assets/calligraphy/tanuki.png';
import TigerImage from '../assets/calligraphy/tiger.png';
import TurtleImage from '../assets/calligraphy/turtle.png';
import ViperImage from '../assets/calligraphy/viper.png';
import CardModel from '../interfaces/card.interface';

const Bear: CardModel = {
  name: 'Bear',
  stamp: 'Blue',
  image: BearImage,
  color: '#1976d2',
  moves: [
    [-1, -1],
    [-1, 0],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', 'C', ' ', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Boar: CardModel = {
  name: 'Boar',
  stamp: 'Red',
  image: BoarImage,
  color: '#689f38',
  moves: [
    [0, -1],
    [-1, 0],
    [0, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', 'C', 'X', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Cobra: CardModel = {
  name: 'Cobra',
  stamp: 'Red',
  image: CobraImage,
  color: '#d32f2f',
  moves: [
    [0, -1],
    [-1, 1],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', 'C', 'X', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Crab: CardModel = {
  name: 'Crab',
  stamp: 'Blue',
  image: CrabImage,
  color: '#689f38',
  moves: [
    [0, -2],
    [-1, 0],
    [0, 2],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    ['C', ' ', 'X', ' ', 'C'],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Crane: CardModel = {
  name: 'Crane',
  stamp: 'Blue',
  image: CraneImage,
  color: '#689f38',
  moves: [
    [1, -1],
    [-1, 0],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', 'C', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Dog: CardModel = {
  name: 'Dog',
  stamp: 'Blue',
  image: DogImage,
  color: '#1976d2',
  moves: [
    [-1, -1],
    [0, -1],
    [1, -1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', 'C', 'X', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Dragon: CardModel = {
  name: 'Dragon',
  stamp: 'Red',
  image: DragonImage,
  color: '#689f38',
  moves: [
    [-1, -2],
    [1, -1],
    [1, 1],
    [-1, 2],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    ['C', ' ', ' ', ' ', 'C'],
    [' ', ' ', 'X', ' ', ' '],
    [' ', 'C', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Eel: CardModel = {
  name: 'Eel',
  stamp: 'Blue',
  image: EelImage,
  color: '#1976D2',
  moves: [
    [-1, -1],
    [1, -1],
    [0, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', 'X', 'C', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Elephant: CardModel = {
  name: 'Elephant',
  stamp: 'Red',
  image: ElephantImage,
  color: '#689f38',
  moves: [
    [-1, -1],
    [0, -1],
    [-1, 1],
    [0, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', 'C', ' '],
    [' ', 'C', 'X', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Fox: CardModel = {
  name: 'Fox',
  stamp: 'Red',
  image: FoxImage,
  color: '#d32f2f',
  moves: [
    [-1, 1],
    [0, 1],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', 'X', 'C', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Frog: CardModel = {
  name: 'Frog',
  stamp: 'Red',
  image: FrogImage,
  color: '#1976D2',
  moves: [
    [0, -2],
    [-1, -1],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    ['C', ' ', 'X', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Giraffe: CardModel = {
  name: 'Giraffe',
  stamp: 'Blue',
  image: GiraffeImage,
  color: '#689f38',
  moves: [
    [-1, -2],
    [-1, 2],
    [1, 0],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    ['C', ' ', ' ', ' ', 'C'],
    [' ', ' ', 'X', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Goose: CardModel = {
  name: 'Goose',
  stamp: 'Blue',
  image: GooseImage,
  color: '#1976D2',
  moves: [
    [-1, -1],
    [0, -1],
    [0, 1],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', 'C', 'X', 'C', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Horse: CardModel = {
  name: 'Horse',
  stamp: 'Red',
  image: HorseImage,
  color: '#1976D2',
  moves: [
    [0, -1],
    [-1, 0],
    [1, 0],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', 'C', 'X', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Iguana: CardModel = {
  name: 'Iguana',
  stamp: 'Red',
  image: IguanaImage,
  color: '#1976d2',
  moves: [
    [-1, -2],
    [-1, 0],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    ['C', ' ', 'C', ' ', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Kirin: CardModel = {
  name: 'Kirin',
  stamp: 'Red',
  image: KirinImage,
  color: '#689f38',
  moves: [
    [-2, -1],
    [-2, 1],
    [2, 0],
  ],
  miniBoard: [
    [' ', 'C', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
  ],
};

const Mantis: CardModel = {
  name: 'Mantis',
  stamp: 'Red',
  image: MantisImage,
  color: '#689F38',
  moves: [
    [-1, -1],
    [1, 0],
    [-1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', 'C', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Monkey: CardModel = {
  name: 'Monkey',
  stamp: 'Blue',
  image: MonkeyImage,
  color: '#689F38',
  moves: [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', 'C', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', 'C', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Mouse: CardModel = {
  name: 'Mouse',
  stamp: 'Blue',
  image: MouseImage,
  color: '#d32f2f',
  moves: [
    [-1, 0],
    [0, 1],
    [1, -1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', 'X', 'C', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Otter: CardModel = {
  name: 'Otter',
  stamp: 'Red',
  image: OtterImage,
  color: '#1976d2',
  moves: [
    [-1, -1],
    [0, 2],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', 'X', ' ', 'C'],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Ox: CardModel = {
  name: 'Ox',
  stamp: 'Blue',
  image: OxImage,
  color: '#d32f2f',
  moves: [
    [-1, 0],
    [1, 0],
    [0, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', 'X', 'C', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Panda: CardModel = {
  name: 'Panda',
  stamp: 'Blue',
  image: PandaImage,
  color: '#d32f2f',
  moves: [
    [-1, 0],
    [-1, 1],
    [1, -1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', 'C', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Phoenix: CardModel = {
  name: 'Phoenix',
  stamp: 'Blue',
  image: PhoenixImage,
  color: '#689f38',
  moves: [
    [-1, -1],
    [-1, 1],
    [0, -2],
    [0, 2],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', 'C', ' ', 'C', ' '],
    ['C', ' ', 'X', ' ', 'C'],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Rabbit: CardModel = {
  name: 'Rabbit',
  stamp: 'Blue',
  image: RabbitImage,
  color: '#d32f2f',
  moves: [
    [1, -1],
    [-1, 1],
    [0, 2],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', 'X', ' ', 'C'],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Rat: CardModel = {
  name: 'Rat',
  stamp: 'Red',
  image: RatImage,
  color: '#1976d2',
  moves: [
    [-1, 0],
    [0, -1],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', 'C', 'X', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Rooster: CardModel = {
  name: 'Rooster',
  stamp: 'Red',
  image: RoosterImage,
  color: '#d32f2f',
  moves: [
    [0, -1],
    [1, -1],
    [-1, 1],
    [0, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', 'C', 'X', 'C', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Sable: CardModel = {
  name: 'Sable',
  stamp: 'Blue',
  image: SableImage,
  color: '#d32f2f',
  moves: [
    [-1, 1],
    [0, -2],
    [1, -1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    ['C', ' ', 'X', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const SeaSnake: CardModel = {
  name: 'Sea Snake',
  stamp: 'Blue',
  image: SeaSnakeImage,
  color: '#d32f2f',
  moves: [
    [-1, 0],
    [0, 2],
    [1, -1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', 'X', ' ', 'C'],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Tanuki: CardModel = {
  name: 'Tanuki',
  stamp: 'Blue',
  image: TanukiImage,
  color: '#d32f2f',
  moves: [
    [-1, 0],
    [-1, 2],
    [1, -1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', 'C'],
    [' ', ' ', 'X', ' ', ' '],
    [' ', 'C', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Tiger: CardModel = {
  name: 'Tiger',
  stamp: 'Blue',
  image: TigerImage,
  color: '#689d38',
  moves: [
    [-2, 0],
    [1, 0],
  ],
  miniBoard: [
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'X', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Turtle: CardModel = {
  name: 'Turtle',
  stamp: 'Red',
  image: TurtleImage,
  color: '#689f38',
  moves: [
    [0, -2],
    [0, 2],
    [1, -1],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    ['C', ' ', 'X', ' ', 'C'],
    [' ', 'C', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

const Viper: CardModel = {
  name: 'Viper',
  stamp: 'Red',
  image: ViperImage,
  color: '#1976d2',
  moves: [
    [-1, 0],
    [0, -2],
    [1, 1],
  ],
  miniBoard: [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'C', ' ', ' '],
    ['C', ' ', 'X', ' ', ' '],
    [' ', ' ', ' ', 'C', ' '],
    [' ', ' ', ' ', ' ', ' '],
  ],
};

export default {
  Bear,
  Boar,
  Cobra,
  Crab,
  Crane,
  Dog,
  Dragon,
  Eel,
  Elephant,
  Fox,
  Frog,
  Giraffe,
  Goose,
  Horse,
  Iguana,
  Kirin,
  Mantis,
  Monkey,
  Mouse,
  Otter,
  Ox,
  Panda,
  Phoenix,
  Rabbit,
  Rat,
  Rooster,
  Sable,
  SeaSnake,
  Tanuki,
  Tiger,
  Turtle,
  Viper,
};
