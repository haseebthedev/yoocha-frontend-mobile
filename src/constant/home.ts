export interface SUGGESTED_USER_DATA_I {
  id: string;
  profilePic: string;
  firstname: string;
  lastname: string;
  city: string;
  country: string;
  noOfFriends: number;
  likes: number;
  posts: {
    id: string;
    media: string;
    profilePic: string;
    date: string;
  }[];
}

export interface HOME_STATUS_DATA_I {
  id: string;
  name: string;
  profilePic: string;
  date: string;
  statusImage: string;
}

export const HOME_STATUS_DATA: HOME_STATUS_DATA_I[] = [
  {
    id: "0",
    name: "You",
    profilePic: "https://picsum.photos/200",
    date: "2024-01-01T21:33:22Z",
    statusImage:
      "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 870w",
  },
  {
    id: "1",
    name: "Adam",
    profilePic: "https://picsum.photos/201",
    date: "2024-01-01T21:33:22Z",
    statusImage:
      "https://images.unsplash.com/photo-1703948057135-8b7b87bac48a?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    name: "Siara",
    profilePic: "https://picsum.photos/202",
    date: "2024-01-01T21:33:22Z",
    statusImage:
      "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 870w",
  },
  {
    id: "3",
    name: "Karen",
    profilePic: "https://picsum.photos/203",
    date: "2024-01-01T21:33:22Z",
    statusImage:
      "https://images.unsplash.com/photo-1594897030264-ab7d87efc473?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 870w",
  },
];

export const HOME_SUGGESTION_DATA: SUGGESTED_USER_DATA_I[] = [
  {
    id: "1",
    profilePic: "https://picsum.photos/205",
    firstname: "Ahmed",
    lastname: "Butt",
    city: "Toronto",
    country: "Canada",
    noOfFriends: 120,
    likes: 220,
    posts: [
      {
        id: "0",
        media: "https://picsum.photos/400",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "1",
        media: "https://picsum.photos/401",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "2",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "3",
        media: "https://picsum.photos/403",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "4",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "5",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
    ],
  },
  {
    id: "2",
    profilePic: "https://picsum.photos/206",
    firstname: "Luisa",
    lastname: "Ali",
    city: "Toronto",
    country: "Canada",
    noOfFriends: 120,
    likes: 220,
    posts: [
      {
        id: "0",
        media: "https://picsum.photos/400",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "1",
        media: "https://picsum.photos/401",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "2",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
    ],
  },
  {
    id: "3",
    profilePic: "https://picsum.photos/207",
    firstname: "Anna",
    lastname: "Alex",
    city: "Toronto",
    country: "United States",
    noOfFriends: 120,
    likes: 220,
    posts: [
      {
        id: "0",
        media: "https://picsum.photos/400",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "1",
        media: "https://picsum.photos/401",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "2",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
    ],
  },
  {
    id: "4",
    profilePic: "https://picsum.photos/208",
    firstname: "Javiera",
    lastname: "Butt",
    city: "Toronto",
    country: "Mexico",
    noOfFriends: 120,
    likes: 220,
    posts: [
      {
        id: "0",
        media: "https://picsum.photos/400",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "1",
        media: "https://picsum.photos/401",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "2",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
    ],
  },
  {
    id: "5",
    profilePic: "https://picsum.photos/209",
    firstname: "Sophie",
    lastname: "khan",
    city: "Toronto",
    country: "Mexico",
    noOfFriends: 120,
    likes: 220,
    posts: [
      {
        id: "0",
        media: "https://picsum.photos/400",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "1",
        media: "https://picsum.photos/401",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "2",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
    ],
  },
  {
    id: "6",
    profilePic: "https://picsum.photos/210",
    firstname: "Yusuf",
    lastname: "Ali",
    city: "Toronto",
    country: "Mexico",
    noOfFriends: 120,
    likes: 220,
    posts: [
      {
        id: "0",
        media: "https://picsum.photos/400",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "1",
        media: "https://picsum.photos/401",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "2",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
    ],
  },
  {
    id: "7",
    profilePic: "https://picsum.photos/211",
    firstname: "Mia",
    lastname: "Mi",
    city: "Toronto",
    country: "Mexico",
    noOfFriends: 120,
    likes: 220,
    posts: [
      {
        id: "0",
        media: "https://picsum.photos/400",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "1",
        media: "https://picsum.photos/401",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
      {
        id: "2",
        media: "https://picsum.photos/402",
        profilePic: "https://picsum.photos/300",
        date: "2024-01-01T21:33:22Z",
      },
    ],
  },
];

export const HOME_CHAT_DATA = [
  {
    id: "0",
    profilePic: "https://picsum.photos/210",
    name: "Alexa",
    onlineStatus: true,
    lastMessage: "Ok. We'll discuss this tomorrow.",
    lastMessageDateTime: "2022-02-05T21:33:22Z",
    noOfUnReadMessages: 5,
  },
  {
    id: "1",
    profilePic: "https://picsum.photos/211",
    name: "John",
    onlineStatus: false,
    lastMessage: "Sure thing!",
    lastMessageDateTime: "2022-02-06T12:45:18Z",
    noOfUnReadMessages: 0,
  },
  {
    id: "2",
    profilePic: "https://picsum.photos/212",
    name: "Emily",
    onlineStatus: true,
    lastMessage: "I'm here now.",
    lastMessageDateTime: "2022-02-07T09:15:30Z",
    noOfUnReadMessages: 0,
  },
  {
    id: "3",
    profilePic: "https://picsum.photos/213",
    name: "David",
    onlineStatus: false,
    lastMessage: "See you later!",
    lastMessageDateTime: "2022-02-08T16:55:42Z",
    noOfUnReadMessages: 1,
  },
  {
    id: "4",
    profilePic: "https://picsum.photos/214",
    name: "Sophia",
    onlineStatus: true,
    lastMessage: "Call me when you can.",
    lastMessageDateTime: "2022-02-09T07:20:55Z",
    noOfUnReadMessages: 0,
  },
  {
    id: "5",
    profilePic: "https://picsum.photos/215",
    name: "Ethan",
    onlineStatus: true,
    lastMessage: "I'll be there in 10 minutes.",
    lastMessageDateTime: "2022-02-10T14:12:10Z",
    noOfUnReadMessages: 0,
  },
  {
    id: "6",
    profilePic: "https://picsum.photos/215",
    name: "David",
    onlineStatus: true,
    lastMessage: "I'll be there in 10 minutes.",
    lastMessageDateTime: "2022-02-10T14:12:10Z",
    noOfUnReadMessages: 0,
  },
  {
    id: "7",
    profilePic: "https://picsum.photos/215",
    name: "Last",
    onlineStatus: true,
    lastMessage: "I'll be there in 10 minutes.",
    lastMessageDateTime: "2022-02-10T14:12:10Z",
    noOfUnReadMessages: 0,
  },
];
