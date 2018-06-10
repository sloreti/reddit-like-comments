export const USERS = [
  {
    id: 1,
    username: "gagabriel",
  },
  {
    id: 2,
    username: "intergalactic",
  },
];

export const DATA = [
  {
    id: 123,
    points: 20,
    createdAt: "2018-03-28T20:15:00.000-04:00",
    text: "Lorem Ipsum",
    user: 1,
    comments: [
      {
        id: 43,
        points: 30,
        createdAt: "2018-03-28T20:16:00.000-04:00",
        text: "Dolor amen",
        user: 2,
        comments: [
          {
            id: 422,
            points: 12,
            createdAt: "2018-03-28T20:17:00.000-04:00",
            text: "Vestibulum lorem purus",
            user: 2,
            comments: [
              // ...
            ],
          },
        ],
      },
      {
        id: 3201,
        points: 0,
        createdAt: "2018-03-28T20:17:00.000-04:00",
        text: "Nullam hendrerit quis arcu sed sodales",
        user: 1,
        comments: [
          // ...
        ],
      },
    ],
  },
  {
    id: 2,
    points: -2,
    createdAt: "2018-03-28T20:12:00.000-04:00",
    text: "Lorem Ipsum",
    user: 2,
    comments: [
      // ...
    ],
  },
];