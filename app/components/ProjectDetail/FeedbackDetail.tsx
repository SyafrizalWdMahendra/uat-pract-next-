"use client";
import { useState, useEffect } from "react";
import { Info, Calendar, User, AlertCircle, Loader2 } from "lucide-react";
import FeedbackDetailBadge from "../Utility/FeedbackDetailBadge";

interface FeedbackData {
  id: number;
  user_id: number;
  test_scenario_id: number;
  feature_id: number;
  project_id: number;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  user: {
    name: string;
  };
  testScenario: {
    code: string;
    test_case: string;
  };
  feature: {
    title: string;
  };
}

interface FeedbackDetailProps {
  feedbackId: number | string;
  token: string;
}

export const FeedbackDetail = ({ feedbackId, token }: FeedbackDetailProps) => {
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!feedbackId || !token) {
      setError("Feedback ID atau Token tidak valid.");
      setIsLoading(false);
      return;
    }

    const fetchFeedbackDetail = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:4000/api/feedback-history/details/${feedbackId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || `Error: ${response.status}`);
        }

        setFeedback(result.payload.data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbackDetail();
  }, [feedbackId, token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-700">Loading feedback details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-10 bg-red-50 border border-red-200 rounded-lg">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <span className="ml-3 text-red-700">{error}</span>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex justify-center items-center p-10">
        <Info className="w-6 h-6 text-gray-500" />
        <span className="ml-3 text-gray-700">
          Data feedback tidak ditemukan.
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {/* Info Pengguna */}
        <div className="bg-blue-100/50 border border-blue-200 p-4 rounded-lg flex items-start">
          <div className="flex flex-col items-start">
            <div className="flex text-blue-400 items-center p-2 gap-2 font-medium text-md">
              <User className="h-5 w-5"></User>
              <p>Submitted By</p>
            </div>
            <span className="capitalize px-2 py-0.5 text-blue-900 rounded-full text-lg">
              {feedback.user.name}
            </span>
          </div>
        </div>

        {/* Status & Prioritas */}
        <div className="bg-orange-100/50 border border-orange-200 p-4 rounded-lg flex items-start">
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-orange-400 items-center p-2 gap-2 font-medium text-md">
              <Info className="h-5 w-5"></Info>
              <p>Status & Priority</p>
            </div>
            <div className="flex justify-around w-full ">
              <FeedbackDetailBadge feedback={feedback} />
            </div>
          </div>
        </div>

        {/* Info Tanggal */}
        <div className="bg-green-100/50 border border-green-200 p-4 rounded-lg flex items-start">
          <div className="flex flex-col items-start">
            <div className="flex text-green-400 items-center p-2 gap-2 font-medium text-md">
              <Calendar className="h-5 w-5"></Calendar>
              <p>Submitted On</p>
            </div>
            <span className="capitalize px-2 py-0.5 text-green-800 rounded-full text-lg">
              {new Date(feedback.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="bg-purple-100/50 border border-purple-200 p-4 rounded-lg flex items-start">
          <div className="flex flex-col items-start">
            <div className="flex text-purple-400 items-center p-2 gap-2 font-medium text-md">
              <Calendar className="h-5 w-5"></Calendar>
              <p>Last updated</p>
            </div>
            <span className="capitalize px-2 py-0.5 text-purple-800 rounded-full text-lg">
              {new Date(feedback.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Feature */}
      <div className="space-y-2">
        <div className="flex p-0 text-gray-700">
          <h3 className="font-semibold">Feature</h3>
        </div>
        <div className="mb-4 border border-gray-300 p-2 pl-4 pr-4 rounded-sm w-full mt-1 bg-gray-100 text-gray-700">
          {feedback.feature.title}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex p-0 text-gray-700">
          <h3 className="font-semibold">Test Scenario</h3>
        </div>
        <div className="mb-4 border border-gray-300 p-2 pl-4 pr-4 rounded-sm w-full mt-1 bg-gray-100 text-gray-700">
          {`${feedback.testScenario.code} - ${feedback.testScenario.test_case}`}
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex p-0 text-gray-700">
          <h3 className="font-semibold">Description</h3>
        </div>
        <div className="mb-4 h-30 border border-gray-300 p-2 pl-4 pr-4 rounded-sm w-full mt-1 bg-gray-100 text-gray-700">
          {feedback.description}
        </div>
      </div>
    </div>
  );
};

// // --- Komponen Helper untuk Info Card ---
// const InfoCard = ({
//   icon,
//   title,
//   children,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   children: React.ReactNode;
// }) => (
//   <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-lg">
//     <div className="flex items-center gap-2 text-gray-700">
//       {icon}
//       <p className="font-semibold">{title}</p>
//     </div>
//     <div className="text-gray-900 ml-6">{children}</div>
//   </div>
// );
