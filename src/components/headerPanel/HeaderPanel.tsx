import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { User } from '../../types/types';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useUserContext } from '../../context/UserContext';

export default function HeaderPanel() {
  const { users, setShowProfile } = useUserContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  return (
    <>
      <header className="header-panel-right">
        <div className="modern-input-block">
          <label className="modern-input-section">
            <input 
              className="modern-input" 
              placeholder="seacrhing players..." 
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="modern-circle-btn">
              <SearchIcon />
            </button>
            <button className="clear-icon" onClick={clearSearchQuery}>
              <ClearIcon />
            </button>
          </label>
          {debouncedSearchQuery.length >= 3 && (
            <ul className="explore-results">
              {filteredUsers.map((user: User) => (
                <li key={user.id} className="flex-between">
                  <div className="flex-info">
                    <img src={user.avatar} className="small-sq-img" alt="Profile Img" />
                    <span className="small-text">{user.userName}</span>
                  </div>
                  <button className="sq-btn-mod" onClick={() => {
                    navigate(`/profile/${user.uid}`);
                    setShowProfile(true);
                  }}>
                    <span className="tiny-color-text">View Profile</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </>
  )
}