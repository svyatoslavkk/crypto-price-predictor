import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { User } from '../../types/types';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useUserContext } from '../../context/UserContext';
import MiniBtn from '../ui/MiniBtn';
import ListItem from '../shared-components/ListItem';
import { VIEW_PROFILE_TITLE, fakeImg } from '../../constants/constants';

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

  const handleViewProfile = (userUid: string) => {
    navigate(`/profile/${userUid}`);
    setShowProfile(true);
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
                <ListItem
                  id={user.id}
                  image={user.avatar}
                  title={user.userName}
                  onClick={() => handleViewProfile(user.uid)}
                  buttonText={VIEW_PROFILE_TITLE}
                  fakeImg={fakeImg}
                />
              ))}
            </ul>
          )}
        </div>
      </header>
    </>
  )
}