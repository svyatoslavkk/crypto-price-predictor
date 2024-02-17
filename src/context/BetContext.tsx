import { createContext, useContext, useState } from 'react';

const BetContext = createContext<{
  countdown: number;
  setCountdown: any;
  betDirection: string;
  setBetDirection: any;
  pointAmount: number;
  setPointAmount: any;
  startPrice: number;
  setStartPrice: any;
  betTime: number;
  setBetTime: any;
  isBetResultShown: boolean;
  setIsBetResultShown: any;
  betStatus: string;
  setBetStatus: any;
}>({
  countdown: 0,
  setCountdown: () => {},
  betDirection: "",
  setBetDirection: () => {},
  pointAmount: 10,
  setPointAmount: () => {},
  startPrice: 0,
  setStartPrice: () => {},
  betTime: 6,
  setBetTime: () => {},
  isBetResultShown: false,
  setIsBetResultShown: () => {},
  betStatus: "",
  setBetStatus: () => {},
});

export const BetProvider = ({ children }: any) => {
  const [countdown, setCountdown] = useState(0);
  const [betDirection, setBetDirection] = useState("");
  const [pointAmount, setPointAmount] = useState(10);
  const [startPrice, setStartPrice] = useState(0);
  const [betTime, setBetTime] = useState(6);
  const [isBetResultShown, setIsBetResultShown] = useState(false);
  const [betStatus, setBetStatus] = useState("");

  return (
    <BetContext.Provider value={{ countdown, setCountdown, betDirection, setBetDirection, pointAmount, setPointAmount, startPrice, setStartPrice, betTime, setBetTime, isBetResultShown, setIsBetResultShown, betStatus, setBetStatus }}>
      {children}
    </BetContext.Provider>
  );
};

export const useBetContext = () => {
  return useContext(BetContext);
};
