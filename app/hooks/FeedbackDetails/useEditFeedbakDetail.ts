import { onSubmitUpdate } from "@/app/lib/FeedbackDetail/fetch";
import { EditFeedbackDetailProps } from "@/app/lib/type";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

export const useEditFeedbackDetail = ({
  token,
  onCancel,
  feedback,
  allFeatures,
  allScenarios,
  allStatuses,
  allPriorities,
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

  const availableScenarios = useMemo(() => {
    if (!selectedFeatureId) return [];
    return allScenarios.filter(
      (s) => s.feature_id.toString() === selectedFeatureId
    );
  }, [allScenarios, selectedFeatureId]);

  const handleFeatureChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFeatureId(e.target.value);
    setSelectedScenarioId("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const selectedFeature = allFeatures.find(
      (f) => f.id.toString() === selectedFeatureId
    );
    const selectedScenario = availableScenarios.find(
      (s) => s.id.toString() === selectedScenarioId
    );

    const payload = {
      feature_title: selectedFeature?.title || "",
      test_scenario_code: selectedScenario?.code || null,
      feedback_status: selectedStatus,
      feedback_priority: selectedPriority,
      feedback_description: description,
    };

    try {
      const updatedFeedback = await onSubmitUpdate({
        feedbackId: feedback.id,
        payload: payload,
        token: token,
      });

      onUpdateSuccess(updatedFeedback);
    } catch (err: any) {
      setErrorMessage(err.message);
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
    handleFeatureChange,
    handleSubmit,
    setDescription,
    setSelectedFeatureId,
    setSelectedPriority,
    setErrorMessage,
    setSelectedScenarioId,
    setSelectedStatus,
  };
};
