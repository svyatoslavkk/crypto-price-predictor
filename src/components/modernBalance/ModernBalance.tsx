import TollIcon from '@mui/icons-material/Toll';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { database } from '../../firebase/firebaseConfig';
import { User } from '../../types/types';
import { modernBalanceLoadingUI } from '../ui/loadingUI';
import { useUserContext } from '../../context/UserContext';

export default function ModernBalance() {
  const { myData, loading } = useUserContext();

  if (loading) return modernBalanceLoadingUI;

  if (!loading) {
    return (
      <section className="modern-balance">
        <div className="flex-info">
          <h3 className="small-text">Your Balance</h3>
          <TollIcon fontSize="small" sx={{ color: '#fff' }} />
        </div>
        <div className="balance">
          <p className="two-diff-texts"><h2 className="text-style-one">${loading ? '0' : myData?.balance}</h2><span className="medium-text" style={{marginBottom: 4}}>.00</span></p>
        </div>
      </section>
    )
  }
}