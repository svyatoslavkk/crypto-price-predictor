export type User = {
  uid: string;
  id: string;
  userName: string;
  avatar: string;
  email: string;
  rank: number;
  balance: number;
  winBets: number;
  totalBets: number;
  historyBets: [];
}

export interface News {
  publishedAt: string;
  urlToImage: string;
  url: string;
  title: string;
}

export interface BetDetails {
  direction: string;
  openTime: string;
  openPrice: number;
  closeTime: string;
  closePrice: number;
  result: string;
}
