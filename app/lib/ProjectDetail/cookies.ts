import { cookies } from "next/headers";
import { IProjectDetail } from "../type";
import { getProjectById } from "../data";
import { notFound, redirect } from "next/navigation";

export const GetProjectDetailCookies = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const projectId = (await params).id;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }
  const project: IProjectDetail | null = await getProjectById(projectId, token);

  if (!project) {
    notFound();
  }
  return { token, project };
};
