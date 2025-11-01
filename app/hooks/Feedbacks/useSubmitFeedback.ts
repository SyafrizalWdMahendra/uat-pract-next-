import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  Feature,
  Scenario,
  SubmitStatus,
  UpdatedSubmitProps,
} from "../../lib/type";
import { decodeJWT } from "../../lib/helper";
import { API_BASE_URL } from "../../utils/cons";

export const useSubmitFeedback = ({
  projectId,
  token,
  initialFeatures,
  initialScenarios,
  onFeedbackSubmitted,
}: UpdatedSubmitProps) => {
  const [featuresList, setFeaturesList] = useState<Feature[]>(
    initialFeatures || []
  );
  const [allScenarios, setAllScenarios] = useState<Scenario[]>(
    initialScenarios || []
  );
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>("");
  const [selectedTestScenarioId, setSelectedTestScenarioId] =
    useState<string>("");
  const [availableScenarios, setAvailableScenarios] = useState<Scenario[]>([]);
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token) as {
        userId?: number | string;
        user_id?: number | string;
        id?: number | string;
        sub?: number | string;
      };
      const extractedUserId =
        decoded?.userId || decoded?.user_id || decoded?.id || decoded?.sub;

      if (extractedUserId) {
        setUserId(Number(extractedUserId));
      } else {
        console.error(
          "Could not extract user_id from token. Available fields:",
          Object.keys(decoded || {})
        );
      }
    }
  }, [token]);

  const handleFeatureChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFeatureId = e.target.value;
    const newFeatureIdNum = Number(newFeatureId);
    setSelectedFeatureId(newFeatureId);
    const filteredScenarios = allScenarios.filter(
      (s) => s.feature_id === newFeatureIdNum
    );

    setAvailableScenarios(filteredScenarios);
    setSelectedTestScenarioId("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFeatureId) {
      setErrorMessage("Please select a feature first.");
      setSubmitStatus("error");
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Please provide a feedback description.");
      setSubmitStatus("error");
      return;
    }
    if (!userId) {
      setErrorMessage(
        "User ID not found. Please refresh the page and try again."
      );
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const featureIdNum = Number(selectedFeatureId);
    const scenarioIdNum = selectedTestScenarioId
      ? Number(selectedTestScenarioId)
      : undefined;

    const feedbackData: any = {
      user_id: userId,
      project_id: Number(projectId),
      feature_id: featureIdNum,
      description: description.trim(),
      status: "open",
      priority: "medium",
    };

    if (scenarioIdNum !== undefined && !isNaN(scenarioIdNum)) {
      feedbackData.test_scenario_id = scenarioIdNum;
    }

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${API_BASE_URL}/api/feedbacks`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok && response.status !== 201) {
        let errorData;
        let errorMessage = "";
        try {
          errorData = await response.json();
          errorMessage =
            errorData.message || errorData.error || "Unknown error";
        } catch (e) {
          errorMessage = await response.text();
        }

        console.error("Server error response:", errorData || errorMessage);
        setErrorMessage(`Error ${response.status}: ${errorMessage}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitStatus("success");
      setSelectedFeatureId("");
      setSelectedTestScenarioId("");
      setDescription("");
      setAvailableScenarios([]);
      onFeedbackSubmitted();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = isSubmitting || selectedFeatureId === "";

  return {
    featuresList,
    availableScenarios,
    selectedFeatureId,
    selectedTestScenarioId,
    description,
    isSubmitting,
    submitStatus,
    errorMessage,
    isButtonDisabled,
    handleFeatureChange,
    handleSubmit,
    setDescription,
    setSelectedTestScenarioId,
  };
};
