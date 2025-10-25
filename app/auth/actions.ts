"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  const cookieStore = await cookies();

  try {
    cookieStore.delete("token");
  } catch (error) {
    console.error("Gagal menghapus cookie token:", error);
  }

  redirect("/login");
};
