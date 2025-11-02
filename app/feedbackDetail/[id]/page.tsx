import { Suspense } from "react";
import Navbar from "@/app/components/Dashboards/Navbar";
import { Loading } from "@/app/components/Utility/Loading";
import FeedbackPageClient from "./FeedbackPageClient";
import { DEFAULT_FILTER_OPTIONS } from "@/app/utils/cons";
import { fetchFeatures, fetchScenarios } from "@/app/lib/ProjectDetail/fetch";
import { getFeedbackData } from "@/app/lib/Feedback/fetch";

export default async function FeedbackDetailPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { feedHistoryDetails, token } = await getFeedbackData(params);

    const projectId = feedHistoryDetails.project_id;

    if (!projectId) {
      console.error("❌ No project_id in feedback");
      return (
        <>
          <Navbar
            title={feedHistoryDetails.feature?.title || "Feedback Detail"}
            description={feedHistoryDetails.description || "No description"}
            priority={feedHistoryDetails.priority}
          />
          <main className="p-4 lg:p-8 lg:mt-21.5 md:mt-25.5 sm:mt-25.5 mt-25.5 xl:25.5">
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">
                Error: No project ID found in feedback
              </p>
            </div>
          </main>
        </>
      );
    }

    const features = await fetchFeatures(projectId, token);
    const scenarios = await fetchScenarios(token);
    const statuses = DEFAULT_FILTER_OPTIONS.statuses;
    const priorities = DEFAULT_FILTER_OPTIONS.priorities;

    return (
      <>
        <Navbar
          title={feedHistoryDetails.feature?.title || "Feedback Detail"}
          description={feedHistoryDetails.description || "No description"}
          priority={feedHistoryDetails.priority}
        />
        <main className="p-4 lg:p-8 lg:mt-21.5 md:mt-25.5 sm:mt-25.5 mt-25.5 xl:25.5">
          <Suspense fallback={<Loading />}>
            <FeedbackPageClient
              initialFeedback={feedHistoryDetails}
              token={token}
              allFeatures={features}
              allTestScenario={scenarios}
              allStatuses={statuses}
              allPriorities={priorities}
            />
          </Suspense>
        </main>
      </>
    );
  } catch (error) {
    console.error("❌ Page error:", error);
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading feedback details</p>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
          {String(error)}
        </pre>
      </div>
    );
  }
}
