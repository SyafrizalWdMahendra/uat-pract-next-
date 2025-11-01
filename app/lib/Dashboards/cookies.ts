import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "./auth";
import { UserPayload } from "../type";

export const GetDashboardCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  const payload = (await verifyToken(token)) as UserPayload | null;
  if (!payload) {
    redirect("/login");
  }

  const userName = payload.name || payload.email || "manager";

  return { userName, token };
};
