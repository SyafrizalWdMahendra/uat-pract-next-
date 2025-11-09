import { onSubmitUpdate } from "@/app/lib/FeedbackDetail/fetch";
import { mapZodErrors } from "@/app/lib/helper/mapZodErrors";
import { EditFeedbackDetailProps } from "@/app/lib/type";
import {
  updateDetailsSchema,
  UpdateDetailsSchema,
} from "@/app/validation/feedbackDetailDto";
import { FormEvent, useMemo, useState } from "react";

export const useEditFeedbackDetail = ({
  token,
  feedback,
  allFeatures,
  allScenarios,
  onUpdateSuccess,
}: EditFeedbackDetailProps) => {
  const [description, setDescription] = useState(feedback.description || "");
  const [selectedFeatureId, setSelectedFeatureId] = useState(
    feedback.feature_id.toString()
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    feedback.test_scenario_id?.toString() || ""
  );
  const [selectedStatus, setSelectedStatus] = useState(feedback.status);
  const [selectedPriority, setSelectedPriority] = useState(feedback.priority);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof UpdateDetailsSchema, string>>
  >({});

  const availableScenarios = useMemo(() => {
    if (!selectedFeatureId) return [];
    return allScenarios.filter(
      (s) => s.feature_id.toString() === selectedFeatureId
    );
  }, [allScenarios, selectedFeatureId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});

    const selectedFeature = allFeatures.find(
      (f) => f.id.toString() === selectedFeatureId
    );
    const selectedScenario = availableScenarios.find(
      (s) => s.id.toString() === selectedScenarioId
    );

    const payload: UpdateDetailsSchema = {
      feature_title: selectedFeature?.title || "",
      test_scenario_code: selectedScenario?.code ?? null,
      feedback_status: selectedStatus,
      feedback_priority: selectedPriority,
      feedback_description: description,
    };

    const result = updateDetailsSchema.safeParse(payload);
    console.log(result);

    if (!result.success) {
      const fieldErrors = mapZodErrors(result.error);
      setFieldErrors(fieldErrors ?? {});
      setIsSubmitting(false);
      return;
    }

    try {
      const updatedFeedback = await onSubmitUpdate({
        feedbackId: feedback.id,
        payload,
        token,
      });
      onUpdateSuccess(updatedFeedback);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to update feedback"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    description,
    selectedFeatureId,
    selectedPriority,
    selectedScenarioId,
    selectedStatus,
    isSubmitting,
    errorMessage,
    availableScenarios,
    fieldErrors,
    handleSubmit,
    setDescription,
    setSelectedFeatureId,
    setSelectedPriority,
    setErrorMessage,
    setSelectedScenarioId,
    setSelectedStatus,
  };
};
