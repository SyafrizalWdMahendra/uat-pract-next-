"use client";

import { EditFeedbackDetailProps } from "@/utils/type";
import SlideUpWrapper from "../Utility/SlideUpWrapper";
import { useEditFeedbackDetail } from "@/hooks/FeedbackDetails/useEditFeedbakDetail";
import { EditFeedbackDetailForm } from "./EditFeedbackDetailForm";

export const EditFeedbackDetail = (props: EditFeedbackDetailProps) => {
  const hookData = useEditFeedbackDetail(props);

  return (
    <SlideUpWrapper>
      <EditFeedbackDetailForm {...hookData} {...props} />
    </SlideUpWrapper>
  );
};
