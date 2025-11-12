import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FeedbackHistoryPayload } from "../../utils/type";
import { getFeedbackHistoryDetails } from "./data";

export const GetFeedbackDetailCookie = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }
  const feedHistoryDetails: FeedbackHistoryPayload | null =
    await getFeedbackHistoryDetails(id, token);

  // if (!feedHistoryDetails) {
  //   notFound();
  // }

  return { token, feedHistoryDetails };
};
