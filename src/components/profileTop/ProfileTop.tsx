import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import TopButtons from '../topButtons/TopButtons';
import { useState, useEffect } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useUserContext } from '../../context/UserContext';

export interface UserData {
  avatar: string;
  userName: string;
  balance: number;
  uid: string;
}

export default function ProfileTop() {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  const { user, fireData, fetchData } = useUserContext();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="profile-top">
      <TopButtons />
      <div className="avatar-section">
        {fireData && fireData
        .filter((data: UserData) => data.uid === user?.uid)
        .map((data) => (
          <img key={data.id} src={data.avatar ? data.avatar : exImg} className="large-circle-img" alt="Avatar" />
        ))}
      </div>
      <div className="username-section">
        {fireData && fireData
        .filter((data: UserData) => data.uid === user?.uid)
        .map((data) => (
          <span key={data.id} className="large-header">{data.userName ? data.userName : 'NO_AUTH'}</span>
        ))}
      </div>
      <button className="sq-btn">
        <ContentCopyIcon fontSize='small' />
        <span>Copy Username</span>
      </button>
      <div className="balance-section">
        <span className="medium-text">Your Balance</span>
        <div className="balance-amount">
          {fireData && fireData
          .filter(data => data.uid === user?.uid)
          .map((data) => (
            <h3 key={data.id} className="large-header">${data.balance ? data.balance.toFixed(2) : '0.00'}</h3>
          ))}
          <div className="percentage-progress">
            <ArrowCircleUpIcon fontSize='small' />
            <span>23.30%</span>
          </div>
        </div>
        <div className="stats-info">
          <div className="stat">
            <ShowChartIcon fontSize="small" sx={{ color: '#f0de69' }} />
            <h3 className="small-header">#1</h3>
            <span className="small-text">Rank</span>
          </div>
          <div className="stat">
            <EmojiEventsIcon fontSize="small" sx={{ color: '#f0de69' }} />
            {fireData && fireData
              .filter(data => data.uid === user?.uid)
              .map((data) => {
                const winRate = (data.winBets / data.totalBets) * 100;
                return (
                  <h3 key={data.id} className="small-header">{data.totalBets !== 0 ? winRate.toFixed(0) : 0}%</h3>
                );
            })}
            <span className="small-text">Win Rate</span>
          </div>
          <div className="stat">
            <CasinoIcon fontSize="small" sx={{ color: '#f0de69' }} />
            {fireData && fireData
            .filter(data => data.uid === user?.uid)
            .map((data) => (
              <h3 key={data.id} className="small-header">{data.totalBets !== undefined ? data.totalBets : '-'}</h3>
            ))}
            <span className="small-text">Total bets</span>
          </div>
          <div className="stat">
            <FavoriteIcon fontSize="small" sx={{ color: '#f0de69' }} />
            <h3 className="small-header">1M</h3>
            <span className="small-text">Followers</span>
          </div>
        </div>
      </div>
    </div>
  )
}