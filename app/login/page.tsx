// import "./loginPage.css"; // Dihapus
import { GoogleIcon } from "../../components/Login/GoogleIcon";
import { GetAuthCookies } from "../../lib/Auth/cookies";
import { Shield } from "lucide-react";

const Login = async () => {
  const cookie = GetAuthCookies();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center space-y-3">
          <Shield className="w-15 h-15 p-3.5 bg-popover text-white rounded-full" />

          <h1 className="text-2xl font-bold text-gray-800">UAT Dashboard</h1>
        </div>

        <p className="text-center text-gray-600 text-sm">
          Sign in with your Google account to access the UAT testing dashboard
        </p>

        <a
          href={(await cookie).googleLoginUrl}
          className="flex items-center justify-center w-full px-6 py-3 transition-colors bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 gap-3"
        >
          <GoogleIcon />
          <span>Sign in with Google</span>
        </a>
      </div>
    </div>
  );
};

export default Login;
