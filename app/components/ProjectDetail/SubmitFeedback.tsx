"use client";

import {
  Feature,
  Scenario,
  SubmitFeedbackCardProps,
  SubmitStatus,
} from "@/app/lib/type";
import { Send } from "lucide-react";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { decodeJWT } from "@/app/lib/helper";

const SubmitFeedbackCard = ({
  projectId,
  token,
  initialFeatures,
  initialScenarios,
}: SubmitFeedbackCardProps) => {
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
      console.log("Decoded token:", decoded);
      const extractedUserId =
        decoded?.userId || decoded?.user_id || decoded?.id || decoded?.sub;

      if (extractedUserId) {
        setUserId(Number(extractedUserId));
        console.log("User ID extracted from token:", extractedUserId);
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
      alert("Please select a feature first.");
      return;
    }

    if (!description.trim()) {
      alert("Please provide a feedback description.");
      return;
    }

    if (!userId) {
      alert("User ID not found. Please refresh the page and try again.");
      console.error("userId is null - token might be invalid");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    const featureIdNum = Number(selectedFeatureId);
    const scenarioIdNum = selectedTestScenarioId
      ? Number(selectedTestScenarioId)
      : undefined;

    if (!featureIdNum || isNaN(featureIdNum)) {
      alert("Invalid feature ID");
      return;
    }

    if (!projectId || isNaN(projectId)) {
      alert("Invalid project ID");
      return;
    }

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

    console.log("=== SENDING FEEDBACK ===");
    console.log("Raw values:", {
      selectedFeatureId,
      selectedTestScenarioId,
      projectId,
      descriptionLength: description.length,
    });
    console.log("Payload to send:");
    console.log(JSON.stringify(feedbackData, null, 2));
    console.log("Token exists:", !!token);
    console.log("========================");

    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch("http://localhost:4000/api/feedbacks", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(feedbackData),
      });

      console.log("Response status:", response.status);
      console.log("Response statusText:", response.statusText);

      if (!response.ok && response.status !== 201) {
        let errorData;
        let errorMessage = "";
        const contentType = response.headers.get("content-type");

        try {
          if (contentType && contentType.includes("application/json")) {
            errorData = await response.json();
            if (errorData.payload && errorData.payload.message) {
              errorMessage = errorData.payload.message;
            } else if (errorData.message) {
              errorMessage = errorData.message;
            } else if (errorData.error) {
              errorMessage = errorData.error;
            } else {
              errorMessage = JSON.stringify(errorData);
            }
          } else {
            const textError = await response.text();
            errorData = { message: textError };
            errorMessage = textError || "Unknown error";
          }
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
          errorMessage = "Failed to parse error response";
        }

        console.error("Server error response:", errorData);
        console.error("Status code:", response.status);

        setErrorMessage(`Error ${response.status}: ${errorMessage}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Full response:", responseData);

      if (responseData.payload) {
        console.log("Feedback submitted successfully:", responseData.payload);
      } else {
        console.log("Feedback submitted successfully:", responseData);
      }

      setSubmitStatus("success");
      setSelectedFeatureId("");
      setSelectedTestScenarioId("");
      setDescription("");
      setAvailableScenarios([]);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isButtonDisabled = isSubmitting || selectedFeatureId === "";

  return (
    <>
      <div className="bg-white p-6 rounded-lg border border-gray-200 mt-8 mb-8">
        <div className="flex items-center mb-6">
          <div className="w-full">
            <div className="flex">
              <Send className="w-5 h-6 text-blue-900 mr-2" />
              <h1 className="text-xl font-semibold text-gray-800">
                Submit Feedback
              </h1>
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-2">
              Report issues, bugs, or provide feedback for specific features and
              test scenarios.
            </p>
          </div>
        </div>

        <div className="flex text-black flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <div className="flex w-full lg:gap-4 md:gap-4 justify-between flex-col md:flex-row">
              <div className="text-sm font-medium w-full">
                <h3>Select Feature</h3>
                <select
                  name="feature"
                  id="feature"
                  className="mb-4 border border-gray-300 p-2 pl-4 pr-4 rounded-sm w-full mt-1 bg-white"
                  value={selectedFeatureId}
                  onChange={handleFeatureChange}
                  disabled={featuresList.length === 0}
                >
                  <option value="" disabled>
                    -- Select a feature --
                  </option>
                  {featuresList.map((feature) => (
                    <option key={feature.id} value={feature.id}>
                      {feature.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-sm font-medium w-full">
                <h3>Test Scenario (Optional)</h3>
                <select
                  name="testScenario"
                  id="testScenario"
                  className="mb-4 border border-gray-300 p-2 pl-4 pr-4 rounded-sm w-full mt-1 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={selectedTestScenarioId}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSelectedTestScenarioId(e.target.value)
                  }
                  disabled={selectedFeatureId === ""}
                >
                  <option value="">
                    -- Select a test scenario (Optional) --
                  </option>
                  {availableScenarios.map((scenario) => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.code} - {scenario.test_case}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm font-medium">
              <h3>Feedback Description</h3>
              <input type="hidden" name="status" value="open" />
              <input type="hidden" name="priority" value="medium" />
              <textarea
                name="description"
                id="description"
                placeholder="Describe the issue, bug, or feedback in detail..."
                className="mb-4 border border-gray-300 p-2 pl-4 pr-4 rounded-sm w-full mt-1"
                rows={5}
                value={description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
              ></textarea>
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`
                      flex w-full rounded-sm pt-2 pl-4 pb-2 pr-4 gap-3 justify-center items-center 
                      font-medium text-white transition-colors
                      ${
                        isButtonDisabled
                          ? "bg-blue-900/20 cursor-not-allowed"
                          : "bg-gray-700 hover:text-white cursor-pointer"
                      }
                    `}
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </span>
              </button>

              {submitStatus === "success" && (
                <p className="text-sm text-green-600 mt-2">
                  Feedback submitted successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <div className="text-sm text-red-600 mt-2">
                  <p className="font-semibold">Error submitting feedback</p>
                  {errorMessage && <p className="mt-1">{errorMessage}</p>}
                  <p className="mt-1">Please check console for more details.</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitFeedbackCard;
