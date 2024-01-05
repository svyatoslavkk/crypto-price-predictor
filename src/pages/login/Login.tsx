import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  return (
    <div className="signup">
      <div className="ring">
        <i style={{ '--clr' : '#00ff0a' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#ff0057' } as React.CSSProperties}></i>
        <i style={{ '--clr' : '#fffd44' } as React.CSSProperties}></i>
        <div className="login">
          <h2>Login</h2>
          <div className="inputBx">
            <input type="text" className="classic-input" placeholder="Email" />
          </div>
          <div className="inputBx">
            <input type="password" className="classic-input" placeholder="Password" />
          </div>
          <div className="inputBx">
            <input type="submit" className="classic-input" value="Login" />
          </div>
          <div className="links">
            <div className="social-icon">
              <GoogleIcon fontSize='large' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
