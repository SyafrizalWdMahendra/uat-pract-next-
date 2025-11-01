import "./loginPage.css";
import { GetAuthCookies } from "../lib/Auth/cookies";

const Login = async () => {
  const cookie = GetAuthCookies();
  return (
    <>
      <div className="loginForm">
        <h1>UAT DASHBOARD</h1>
        <p>
          Sign in with your Google account to access the UAT testing dashboard
        </p>
        <a href={(await cookie).googleLoginUrl} className="google-login-button">
          <span>Sign in with Google</span>
        </a>
      </div>
    </>
  );
};

export default Login;
