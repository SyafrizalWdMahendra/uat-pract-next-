"use client";

import { EditFeedbackDetailProps } from "@/app/lib/type";
import SlideUpWrapper from "../Utility/SlideUpWrapper";
import { useEditFeedbackDetail } from "@/app/hooks/FeedbackDetails/useEditFeedbakDetail";
import { EditFeedbackDetailForm } from "./EditFeedbackDetailForm";

export const EditFeedbackDetail = (props: EditFeedbackDetailProps) => {
  const hookData = useEditFeedbackDetail(props);

  return (
    <SlideUpWrapper>
      <EditFeedbackDetailForm {...hookData} {...props} />
    </SlideUpWrapper>
  );
};
