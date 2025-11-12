"use client";

import { Info, Calendar, User } from "lucide-react";
import FeedbackDetailBadge from "../Utility/FeedbackDetailBadge";
import { FeedbackDetailProps } from "@/utils/type";
import { EditFeedbackDetailButton } from "./EditFeedbackDetailButton";
import SlideUpWrapper from "../Utility/SlideUpWrapper";

export const FeedbackDetail = ({
  feedback,
  onEditClick,
}: FeedbackDetailProps) => {
  return (
    <SlideUpWrapper>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {/* Info Pengguna */}
          <div className="flex bg-blue-100/50 border border-blue-200 px-3 py-3 rounded-md items-center h-max">
            <div className="flex flex-col items-start">
              <div className="flex text-blue-400 items-center p-2 gap-2 font-medium text-md">
                <User className="h-5 w-5"></User>
                <p>Submitted By</p>
              </div>
              <span className="capitalize px-2 py-0.5 text-blue-900 text-lg">
                {feedback.user.name}
              </span>
            </div>
          </div>

          {/* Status & Prioritas */}
          <div className="bg-orange-100/50 border border-orange-200 flex px-3 py-3 rounded-md items-center h-max">
            <div className="flex flex-col items-center gap-2">
              <div className="flex text-orange-400 items-center p-2 gap-2 font-medium text-md">
                <Info className="h-5 w-5"></Info>
                <p>Status & Priority</p>
              </div>
              <div className="flex justify-start gap-2 pl-2 w-full ">
                <FeedbackDetailBadge feedback={feedback} />
              </div>
            </div>
          </div>

          {/* Info Tanggal */}
          <div className="bg-green-100/50 border border-green-200 flex px-3 py-3 rounded-md items-center h-max">
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
          <div className="bg-purple-100/50 border border-purple-200 flex px-3 py-3 rounded-md items-center h-max">
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
          <div className="mb-4 border border-gray-300 p-2 pl-4 pr-4 rounded-md w-full mt-1 bg-gray-100 text-gray-700">
            {feedback.feature.title}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex p-0 text-gray-700">
            <h3 className="font-semibold">Test Scenario</h3>
          </div>
          <div className="mb-4 border border-gray-300 p-2 pl-4 pr-4 rounded-md w-full mt-1 bg-gray-100 text-gray-700">
            {feedback.testScenario
              ? `${feedback.testScenario.code} - ${feedback.testScenario.test_case}`
              : "N/A"}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex p-0 text-gray-700">
            <h3 className="font-semibold">Description</h3>
          </div>
          <div className="mb-4 h-30 border border-gray-300 p-2 pl-4 pr-4 rounded-md w-full mt-1 bg-gray-100 text-gray-700">
            {feedback.description || "N/A"}
          </div>
        </div>

        {/* Tombol Edit Mobile */}
        <div className="w-full md:hidden mt-6">
          <EditFeedbackDetailButton onClick={onEditClick} />
        </div>
      </div>
    </SlideUpWrapper>
  );
};
