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

export const SUGGESTED_USER_DATA: SUGGESTED_USER_DATA_I[] = [
  {
    id: "6",
    profilePic: "https://picsum.photos/228",
    firstname: "Thomas",
    lastname: "Wilson",
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
    id: "7",
    profilePic: "https://picsum.photos/229",
    firstname: "Elena",
    lastname: "Petrova",
    city: "Toronto",
    country: "Russia",
    noOfFriends: 120,
    likes: 720,
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
    id: "8",
    profilePic: "https://picsum.photos/230",
    firstname: "Miguel",
    lastname: "Rodriguez",
    city: "Toronto",
    country: "Argentina",
    noOfFriends: 120,
    likes: 130,

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
    id: "9",
    profilePic: "https://picsum.photos/231",
    firstname: "Emily",
    lastname: "Chen",
    city: "Toronto",
    country: "China",
    noOfFriends: 120,
    likes: 10,
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
