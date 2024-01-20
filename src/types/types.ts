export type User = {
  uid: string;
  id: string;
  userName: string;
  avatar: string;
  email: string;
  rank: number;
  balance: string;
}

export interface News {
  publishedAt: string;
  urlToImage: string;
  url: string;
  title: string;
}
