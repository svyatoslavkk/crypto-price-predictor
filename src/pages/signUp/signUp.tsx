import GoogleIcon from '@mui/icons-material/Google';

export default function SignUp() {
  return (
    <div className="signup">
      <div className="ring">
        <i style={{ '--clr' : '#00ff0a' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#ff0057' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#fffd44' } as React.CSSProperties}></i>
        <div className="login">
          <h2>Register</h2>
          <div className="inputBx">
            <input type="text" className="classic-input" placeholder="Username" />
          </div>
          <div className="inputBx">
            <input type="text" className="classic-input" placeholder="Email" />
          </div>
          <div className="inputBx">
            <input type="password" className="classic-input" placeholder="Password" />
          </div>
          <div className="inputBx">
            <input type="submit" className="classic-input" value="Sign Up" />
          </div>
          <div className="links">
            <div className="social-icon">
              <GoogleIcon fontSize='large' />
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="signup">
    //   <input className="classic-input" placeholder="Email" />
    //   <input className="classic-input" placeholder="Password" />
    //   <button>Sign Up</button>
    //   <div className="socials">
    //     <GoogleIcon />
    //   </div>
    // </div>
  )
}