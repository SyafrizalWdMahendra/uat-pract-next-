"use client";

import { useEffect, useState, useActionState } from "react";
import {
  ActionState,
  Feature,
  FeedbackData,
  JwtPayload,
  Scenario,
  SubmitStatus,
  UpdatedSubmitProps,
} from "../../utils/type";
import { API_BASE_URL } from "../../utils/cons";
import toast from "react-hot-toast";
import { decodeJWT } from "@/lib/helper/decodeJwt";

export const useSubmitFeedback = ({
  projectId,
  token,
  initialFeatures,
  initialScenarios,
  onFeedbackSubmitted,
}: UpdatedSubmitProps) => {
  const [featuresList] = useState<Feature[]>(initialFeatures || []);
  const [allScenarios] = useState<Scenario[]>(initialScenarios || []);
  const [availableScenarios, setAvailableScenarios] = useState<Scenario[]>([]);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>("");
  const [selectedTestScenarioId, setSelectedTestScenarioId] =
    useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      const decoded = decodeJWT(token) as JwtPayload;
      const extractedUserId =
        decoded?.userId ||
        decoded?.user_id ||
        decoded?.id ||
        (typeof decoded?.sub === "number" ? decoded.sub : Number(decoded?.sub));

      if (extractedUserId) {
        setUserId(Number(extractedUserId));
      } else {
        console.error("User ID not found in token payload:", decoded);
      }
    }
  }, [token]);

  const handleFeatureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFeatureId = e.target.value;
    setSelectedFeatureId(newFeatureId);
    setAvailableScenarios(
      allScenarios.filter((s) => s.feature_id === Number(newFeatureId))
    );
    setSelectedTestScenarioId("");
  };

  const submitFeedbackAction = async (
    _prevState: ActionState,
    formData: FormData
  ): Promise<ActionState> => {
    const featureId = formData.get("feature") as string;
    const scenarioId = formData.get("testScenario") as string;
    const description = formData.get("description") as string;

    if (!featureId)
      return { status: "error", message: "Please select a feature first." };
    if (!description.trim())
      return {
        status: "error",
        message: "Please provide feedback description.",
      };
    if (!userId)
      return {
        status: "error",
        message: "User ID not found. Please refresh and try again.",
      };

    const feedbackData: FeedbackData = {
      user_id: userId,
      project_id: Number(projectId),
      feature_id: Number(featureId),
      description: description.trim(),
      status: "open",
      priority: "medium",
    };
    if (scenarioId) feedbackData.test_scenario_id = Number(scenarioId);

    try {
      const response = await fetch(`${API_BASE_URL}/api/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text);
      }

      onFeedbackSubmitted?.();

      return {
        status: "success",
        message: "Feedback submitted successfully 🎉",
      };
    } catch (error) {
      console.error("Error submitting feedback:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unexpected error";
      return { status: "error", message: errorMessage };
    }
  };

  const initialMessage: ActionState = { status: null, message: "" };

  const [actionState, formAction, isPending] = useActionState(
    submitFeedbackAction,
    initialMessage
  );

  const isButtonDisabled =
    isPending ||
    !selectedFeatureId ||
    !selectedTestScenarioId ||
    !description.trim();

  useEffect(() => {
    if (actionState.status === "success") {
      toast.success(actionState.message);
      setSelectedFeatureId("");
      setSelectedTestScenarioId("");
      setDescription("");
    } else if (actionState.status === "error") {
      toast.error(
        actionState.message || "Failed to add feedback. Please try again 😢"
      );
    }
  }, [actionState.status, actionState.message]);

  return {
    featuresList,
    availableScenarios,
    selectedFeatureId,
    selectedTestScenarioId,
    description,
    submitStatus: actionState.status as SubmitStatus,
    errorMessage: actionState.status === "error" ? actionState.message : "",
    isSubmitting: isPending,
    isButtonDisabled,
    handleFeatureChange,
    setDescription,
    setSelectedTestScenarioId,
    formAction,
  };
};
