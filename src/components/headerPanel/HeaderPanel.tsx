import SearchIcon from '@mui/icons-material/Search';

export default function HeaderPanel({ userImg, userUserName }) {
  const exImg = 'https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png';
  return (
    <header className="header-panel-right">
      <label className="modern-input-section">
        <input className="modern-input" placeholder="seacrhing..." />
        <button className="modern-circle-btn">
          <SearchIcon />
        </button>
      </label>
      <div className="flex-info">
        <span className="medium-text">{userUserName}</span>
        <img src={userImg} className="medium-circle-img" alt="Profile Image" />
      </div>
    </header>
  )
}