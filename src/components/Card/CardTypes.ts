interface Card {
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
  character: string;
  moves: number[][];
}

const Boar: Card = {
  name: 'Boar',
  stamp: 'Red',
  character: '豬',
  moves: [
    [0, -1],
    [-1, 0],
    [0, 1],
  ],
};

const Cobra: Card = {
  name: 'Cobra',
  stamp: 'Red',
  character: '鏡蛇',
  moves: [
    [0, -1],
    [-1, 1],
    [1, 1],
  ],
};

const Crab: Card = {
  name: 'Crab',
  stamp: 'Blue',
  character: '蟹',
  moves: [
    [0, -2],
    [-1, 0],
    [0, 2],
  ],
};

const Crane: Card = {
  name: 'Crane',
  stamp: 'Blue',
  character: '鶴',
  moves: [
    [1, -1],
    [-1, 0],
    [1, 1],
  ],
};

const Dragon: Card = {
  name: 'Dragon',
  stamp: 'Red',
  character: '龍',
  moves: [
    [-1, -2],
    [1, -1],
    [1, 1],
    [-1, 2],
  ],
};

const Eel: Card = {
  name: 'Eel',
  stamp: 'Blue',
  character: '鰻',
  moves: [
    [-1, -1],
    [1, -1],
    [0, 1],
  ],
};

const Elephant: Card = {
  name: 'Elephant',
  stamp: 'Red',
  character: '象',
  moves: [
    [-1, -1],
    [0, -1],
    [-1, 1],
    [0, 1],
  ],
};

const Frog: Card = {
  name: 'Frog',
  stamp: 'Red',
  character: '蛙',
  moves: [
    [0, -2],
    [-1, -1],
    [1, 1],
  ],
};

const Goose: Card = {
  name: 'Goose',
  stamp: 'Blue',
  character: '鵝',
  moves: [
    [-1, -1],
    [0, -1],
    [0, 1],
    [1, 1],
  ],
};

const Horse: Card = {
  name: 'Horse',
  stamp: 'Red',
  character: '馬',
  moves: [
    [0, -1],
    [-1, 0],
    [1, 0],
  ],
};

const Mantis: Card = {
  name: 'Mantis',
  stamp: 'Red',
  character: '螳螂',
  moves: [
    [-1, -1],
    [1, 0],
    [-1, 1],
  ],
};

const Monkey: Card = {
  name: 'Monkey',
  stamp: 'Blue',
  character: '猴',
  moves: [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ],
};

const Ox: Card = {
  name: 'Ox',
  stamp: 'Blue',
  character: '牛',
  moves: [
    [-1, 0],
    [1, 0],
    [0, 1],
  ],
};

const Rabbit: Card = {
  name: 'Rabbit',
  stamp: 'Blue',
  character: '兔',
  moves: [
    [1, -1],
    [-1, 1],
    [0, 2],
  ],
};

const Rooster: Card = {
  name: 'Rooster',
  stamp: 'Red',
  character: '雞',
  moves: [
    [0, -1],
    [1, -1],
    [-1, 1],
    [0, 1],
  ],
};

const Tiger: Card = {
  name: 'Tiger',
  stamp: 'Blue',
  character: '虎',
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
