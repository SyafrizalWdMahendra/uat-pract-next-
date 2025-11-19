import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GetAuthCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboards");
  }

  const googleLoginUrl = "https://uat-pract.vercel.app/api/auth/google";
  return { googleLoginUrl, token };
};
