export type User = {
  docId: string;
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

export interface INews {
  publishedAt: string;
  urlToImage: string;
  url: string;
  title: string;
}

export type IBetDetails = {
  direction: string;
  openTime: string;
  openPrice: number;
  closeTime: string;
  closePrice: number;
  result: string;
}

export type IAchievement = {
  header: string;
  image: string;
  description: string;
  achieved: boolean;
}

export type Coin = {
  image: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: number;
}

export type IActiveBet = {
  countdown: number;
  betDirection: string;
  pointAmount: number;
  startPrice: number;
}

export type IResultBet = {
  countdown: number;
  isBetResultShown: boolean;
  betStatus: string;
}

export type IRankItem = {
  uid: string;
  avatar: string;
  userName: string;
  rank: number;
  balance: number;
}
