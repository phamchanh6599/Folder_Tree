export const TREE_DATAS = [
  {
    title: 'My folder name 1',
    key: '1',
    visible: ['everyone'],
    children: [
      {
        title: 'My folder name 1-a',
        key: 'My folder name 1-a',
        isLeaf: true,
        visible: ['everyone'],
      },
      {
        title: 'My folder name 1-b',
        key: 'My folder name 1-b',
        isLeaf: true,
        visible: ['everyone'],
      },
    ],
  },
  {
    title: 'My folder name 2',
    key: 'My folder name 2',
    visible: ['Luffy', 'Naturo'],
    children: [],
  },
  {
    title: 'My folder name 3',
    key: 'My folder name 3',
    visible: ['Songoku'],
    children: [
      {
        title: 'My folder name 3-1',
        key: 'My folder name 3-1',
        isLeaf: true,
        visible: ['Songoku'],
      },
      {
        title: 'My folder name 3-2',
        key: 'My folder name 3-2',
        isLeaf: true,
        visible: ['me'],
      },
    ],
  },
];
