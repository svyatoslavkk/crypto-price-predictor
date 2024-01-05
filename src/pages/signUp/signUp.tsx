import GoogleIcon from '@mui/icons-material/Google';

export default function SignUp() {
  return (
    <div className="container">
      <input className="classic-input" placeholder="Email" />
      <input className="classic-input" placeholder="Password" />
      <button>Sign Up</button>
      <div className="socials">
        <GoogleIcon />
      </div>
    </div>
  )
}