import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const GetAuthCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    redirect("/dashboards");
  }

  // const googleLoginUrl = "https://uat-pract-mahennekkers27-2401-mahens-projects-240b520d.vercel.app/api/auth/google";
  const googleLoginUrl = "http://localhost:4000/api/auth/google";
  return { googleLoginUrl, token };
};
