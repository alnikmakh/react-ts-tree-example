export type TopicEntity = {
  id: string;
  title: string;
  children: TopicEntity[];
  posts: TopicEntity[];
};

export const TOPICS: TopicEntity[] = [
  {
    id: '1',
    title: 'Topic 0',
    children: [
      {
        id: '2',
        title: 'Topic 0-1',
        children: [],
        posts: [
          {
            id: '4',
            title: 'Post 0-1-1',
            children: [],
            posts: [],
          },
          {
            id: '5',
            title: 'Post 0-1-2',
            children: [],
            posts: [],
          },
        ],
      },
      {
        id: '3',
        title: 'Topic 0-2',
        children: [],
        posts: [
          {
            id: '6',
            title: 'Post 0-2-1',
            children: [],
            posts: [],
          },
          {
            id: '7',
            title: 'Post 0-2-2',
            children: [],
            posts: [],
          },
        ],
      },
    ],
    posts: [
      {
        id: '8',
        title: 'Post 0-1',
        children: [],
        posts: [],
      },
      {
        id: '9',
        title: 'Post 0-2',
        children: [],
        posts: [],
      },
    ],
  },
  {
    id: '10',
    title: 'Topic 1',
    children: [
      {
        id: '11',
        title: 'Topic 1-1',
        children: [],
        posts: [
          {
            id: '13',
            title: 'Post 1-1-1',
            children: [],
            posts: [],
          },
          {
            id: '14',
            title: 'Post 1-1-2',
            children: [],
            posts: [],
          },
        ],
      },
      {
        id: '12',
        title: 'Topic 1-2',
        children: [],
        posts: [
          {
            id: '15',
            title: 'Post 1-2-1',
            children: [],
            posts: [],
          },
          {
            id: '16',
            title: 'Post 1-2-2',
            children: [],
            posts: [],
          },
        ],
      },
    ],
    posts: [
      {
        id: '17',
        title: 'Post 1-1',
        children: [],
        posts: [],
      },
      {
        id: '18',
        title: 'Post 1-2',
        children: [],
        posts: [],
      },
    ],
  },
];
