import BoarImage from '../../assets/calligraphy/boar.png';
import CobraImage from '../../assets/calligraphy/cobra.png';
import CrabImage from '../../assets/calligraphy/crab.png';
import CraneImage from '../../assets/calligraphy/crane.png';
import DragonImage from '../../assets/calligraphy/dragon.png';
import EelImage from '../../assets/calligraphy/eel.png';
import ElephantImage from '../../assets/calligraphy/elephant.png';
import FrogImage from '../../assets/calligraphy/frog.png';
import GooseImage from '../../assets/calligraphy/goose.png';
import HorseImage from '../../assets/calligraphy/horse.png';
import MantisImage from '../../assets/calligraphy/mantis.png';
import MonkeyImage from '../../assets/calligraphy/monkey.png';
import OxImage from '../../assets/calligraphy/ox.png';
import RabbitImage from '../../assets/calligraphy/rabbit.png';
import RoosterImage from '../../assets/calligraphy/rooster.png';
import TigerImage from '../../assets/calligraphy/tiger.png';
import CardModel from '../../interfaces/card.interface';

const Boar: CardModel = {
  name: 'Boar',
  stamp: 'Red',
  image: BoarImage,
  color: '#689F38',
  moves: [
    [0, -1],
    [-1, 0],
    [0, 1],
  ],
};

const Cobra: CardModel = {
  name: 'Cobra',
  stamp: 'Red',
  image: CobraImage,
  color: '#D32F2F',
  moves: [
    [0, -1],
    [-1, 1],
    [1, 1],
  ],
};

const Crab: CardModel = {
  name: 'Crab',
  stamp: 'Blue',
  image: CrabImage,
  color: '#689F38',
  moves: [
    [0, -2],
    [-1, 0],
    [0, 2],
  ],
};

const Crane: CardModel = {
  name: 'Crane',
  stamp: 'Blue',
  image: CraneImage,
  color: '#689F38',
  moves: [
    [1, -1],
    [-1, 0],
    [1, 1],
  ],
};

const Dragon: CardModel = {
  name: 'Dragon',
  stamp: 'Red',
  image: DragonImage,
  color: '#689F38',
  moves: [
    [-1, -2],
    [1, -1],
    [1, 1],
    [-1, 2],
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
};

const Elephant: CardModel = {
  name: 'Elephant',
  stamp: 'Red',
  image: ElephantImage,
  color: '#689F38',
  moves: [
    [-1, -1],
    [0, -1],
    [-1, 1],
    [0, 1],
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
};

const Ox: CardModel = {
  name: 'Ox',
  stamp: 'Blue',
  image: OxImage,
  color: '#D32F2F',
  moves: [
    [-1, 0],
    [1, 0],
    [0, 1],
  ],
};

const Rabbit: CardModel = {
  name: 'Rabbit',
  stamp: 'Blue',
  image: RabbitImage,
  color: '#D32F2F',
  moves: [
    [1, -1],
    [-1, 1],
    [0, 2],
  ],
};

const Rooster: CardModel = {
  name: 'Rooster',
  stamp: 'Red',
  image: RoosterImage,
  color: '#D32F2F',
  moves: [
    [0, -1],
    [1, -1],
    [-1, 1],
    [0, 1],
  ],
};

const Tiger: CardModel = {
  name: 'Tiger',
  stamp: 'Blue',
  image: TigerImage,
  color: '#689F38',
  moves: [
    [-2, 0],
    [1, 0],
  ],
};

export default {
  Boar,
  Cobra,
  Crab,
  Crane,
  Dragon,
  Eel,
  Elephant,
  Frog,
  Goose,
  Horse,
  Mantis,
  Monkey,
  Ox,
  Rabbit,
  Rooster,
  Tiger,
};
