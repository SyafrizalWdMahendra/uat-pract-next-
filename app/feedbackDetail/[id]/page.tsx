import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { FeedbackDetail } from "@/app/components/ProjectDetail/FeedbackDetail";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { FeedbackHistoryPayload, IProjectDetail } from "@/app/lib/type";
import { getFeedbackHistoryDetails, getProjectById } from "@/app/lib/data";
import Navbar from "@/app/components/Dashboards/Navbar";
import SlideUpWrapper from "@/app/components/Utility/SlideUpWrapper";
import { BackButton } from "@/app/components/ProjectDetail/BackButton";

export default async function FeedbackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }
  const feedHistoryDetails: FeedbackHistoryPayload | null =
    await getFeedbackHistoryDetails(id, token);

  if (!feedHistoryDetails) {
    notFound();
  }

  return (
    <>
      <Navbar
        title={feedHistoryDetails.feature.title}
        description={`${feedHistoryDetails.description}`}
        priority={feedHistoryDetails.priority}
      />
      <main className="p-4 lg:p-8  lg:mt-21.5 md:mt-25.5 sm:mt-25.5 mt-25.5 xl:25.5">
        <SlideUpWrapper>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex gap-4 items-center mb-6 border-b pb-2">
              <BackButton />
              <div className="flex-col justify-center">
                <h1 className="text-xl font-semibold text-gray-800">
                  Feedback Details
                </h1>
                <p className=" text-gray-500">
                  View and edit feedback information
                </p>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="flex justify-center items-center p-10">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-700">
                    Loading feedback details...
                  </span>
                </div>
              }
            >
              <FeedbackDetail feedbackId={id} token={token} />
            </Suspense>
          </div>
        </SlideUpWrapper>
      </main>
    </>
  );
}
