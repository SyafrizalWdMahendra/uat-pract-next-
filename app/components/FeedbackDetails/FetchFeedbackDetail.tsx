// import { GetFeedbackDetailCookie } from "@/app/lib/FeedbackDetail/cookies";
// import Navbar from "../Dashboards/Navbar";

// const getFeedbackData = async (params: { id: string }) => {
//   const { feedHistoryDetails, token } = await GetFeedbackDetailCookie({
//     params,
//   });
//   return { feedHistoryDetails, token };
// };

// export const FetchFeedbackDetail = async ({
//   params,
// }: {
//   params: { id: string };
// }) => {
//   const { feedHistoryDetails, token } = await getFeedbackData(params);

//   console.log("📋 Feedback data:", {
//     id: feedHistoryDetails.id,
//     project_id: feedHistoryDetails.project_id,
//     feature_id: feedHistoryDetails.feature_id,
//     test_scenario_id: feedHistoryDetails.test_scenario_id,
//     status: feedHistoryDetails.status,
//     priority: feedHistoryDetails.priority,
//     feature: feedHistoryDetails.feature,
//   });

//   const projectId = feedHistoryDetails.project_id;

//   // return feedHistoryDetails;

//   if (!projectId) {
//     return (
//       <>
//         <Navbar
//           title={feedHistoryDetails.feature?.title || "Feedback Detail"}
//           description={feedHistoryDetails.description || "No description"}
//           priority={feedHistoryDetails.priority}
//         />
//         <main className="p-4 lg:p-8 lg:mt-21.5 md:mt-25.5 sm:mt-25.5 mt-25.5 xl:25.5">
//           <div className="p-4 bg-red-50 border border-red-200 rounded">
//             <p className="text-red-600">
//               Error: No project ID found in feedback
//             </p>
//           </div>
//         </main>
//       </>
//     );
//   }
// };
