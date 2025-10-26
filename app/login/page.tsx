import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import "./loginPage.css";

const Login = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboards");
  }

  const googleLoginUrl = "http://localhost:4000/api/auth/google";

  return (
    <>
      <div className="loginForm">
        <h1>UAT DASHBOARD</h1>
        <p>
          Sign in with your Google account to access the UAT testing dashboard
        </p>
        <a href={googleLoginUrl} className="google-login-button">
          <span>Sign in with Google</span>
        </a>
      </div>
    </>
  );
};

export default Login;
