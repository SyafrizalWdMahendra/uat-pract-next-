import { FeedbackDetail } from "@/app/components/ProjectDetail/FeedbackDetail";
import { Suspense } from "react";
import Navbar from "@/app/components/Dashboards/Navbar";
import SlideUpWrapper from "@/app/components/Utility/SlideUpWrapper";
import { BackButton } from "@/app/components/ProjectDetail/BackButton";
import { GetFeedbackDetailCookie } from "@/app/lib/FeedbackDetail/cookies";
import { Loading } from "@/app/components/Utility/Loading";

export default async function FeedbackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { feedHistoryDetails, token } = await GetFeedbackDetailCookie({
    params,
  });

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

            <Suspense fallback={<Loading />}>
              <FeedbackDetail
                feedbackId={feedHistoryDetails.id}
                token={token}
              />
            </Suspense>
          </div>
        </SlideUpWrapper>
      </main>
    </>
  );
}
