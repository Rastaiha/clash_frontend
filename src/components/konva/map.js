const json_map = {
  size: {
    width: 1000,
    height: 1000,
  },
  trees: {
    img: process.env.PUBLIC_URL + '/images/sprites/tree.png',
    size: {
      width: 150,
      height: 150,
    },
    instances: [...Array(10)].map(() => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    })),
  },
  half_trees: {
    img: process.env.PUBLIC_URL + '/images/sprites/half_tree.png',
    size: {
      width: 50,
      height: 50,
    },
    instances: [...Array(5)].map(() => ({
      x: Math.random() * 1000,
      y: Math.random() * 1000,
    })),
  },
  abolhol: {
    img: process.env.PUBLIC_URL + '/images/sprites/abolhol.png',
    size: {
      width: 100,
      height: 100,
    },
    instances: [...Array(1)].map(() => ({
      x: Math.random() * 200,
      y: Math.random() * 200,
    })),
  },
};
export default json_map;
