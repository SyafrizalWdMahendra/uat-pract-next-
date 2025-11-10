"use client";

import { UpdatedSubmitProps } from "@/app/lib/type";
import { useSubmitFeedback } from "@/app/hooks/Feedbacks/useSubmitFeedback";
import { SubmitFeedbackForm } from "./SubmitFeedbackForm";
import { HeadTitleCard } from "../Utility/HeadTitleCard";

const SubmitFeedbackCard = (props: UpdatedSubmitProps) => {
  const hookData = useSubmitFeedback(props);

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-8 mb-8">
        <HeadTitleCard title={"submit-feedback"}></HeadTitleCard>
        <SubmitFeedbackForm {...hookData} {...props} />
      </div>
    </>
  );
};

export default SubmitFeedbackCard;
