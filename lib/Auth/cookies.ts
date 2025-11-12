import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GetAuthCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboards");
  }

  const googleLoginUrl = "http://localhost:4000/api/auth/google";
  return { googleLoginUrl, token };
};
