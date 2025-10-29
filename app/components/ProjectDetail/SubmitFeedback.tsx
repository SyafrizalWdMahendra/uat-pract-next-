"use client";

import { Feature, FeedbackPayload, Scenario } from "@/app/lib/type";
import { Send } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import Form from "next/form";

type SubmitStatus = "success" | "error" | null;

interface SubmitFeedbackCardProps {
  projectId: number;
  token: string;
  initialFeatures: Feature[];
  initialScenarios: Scenario[];
}

const SubmitFeedbackCard = ({
  projectId,
  token,
  initialFeatures,
  initialScenarios,
}: SubmitFeedbackCardProps) => {
  const [featuresList, setFeaturesList] = useState<Feature[]>(initialFeatures);
  const [allScenarios, setAllScenarios] =
    useState<Scenario[]>(initialScenarios);
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>("");
  const [selectedTestScenarioId, setSelectedTestScenarioId] =
    useState<string>("");
  const [availableScenarios, setAvailableScenarios] = useState<Scenario[]>([]);
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
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

    setIsSubmitting(true);
    setSubmitStatus(null);

    const featureIdNum = Number(selectedFeatureId);
    const scenarioId = selectedTestScenarioId
      ? Number(selectedTestScenarioId)
      : null;

    const feedbackData: FeedbackPayload = {
      user_id: 2,
      project_id: projectId,
      feature_id: featureIdNum,
      test_scenario_id: scenarioId,
      description: description,
      status: "open",
      priority: "medium",
    };

    try {
      const response = await fetch("http://localhost:4000/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
          <Form action={`/projects/${projectId}`} onSubmit={handleSubmit}>
            <div className="text-sm font-medium">
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

            <div className="text-sm font-medium">
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
                <option value="">-- Select a scenario (Optional) --</option>
                {availableScenarios.map((scenario) => (
                  <option key={scenario.id} value={scenario.id}>
                    {scenario.test_case}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm font-medium">
              <h3>Feedback Description</h3>
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
              <div
                className={`flex rounded-sm pt-2 pl-4 pb-2 pr-4 gap-3 justify-center text-gray-700 transition-colors ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-blue-900/20 hover:bg-gray-700 hover:text-white cursor-pointer"
                }`}
              >
                <Send className="w-4 h-4"></Send>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="hover:cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>

              {submitStatus === "success" && (
                <p className="text-sm text-green-600 mt-2">
                  Feedback submitted successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-sm text-red-600 mt-2">
                  Error submitting feedback. Please try again.
                </p>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SubmitFeedbackCard;
