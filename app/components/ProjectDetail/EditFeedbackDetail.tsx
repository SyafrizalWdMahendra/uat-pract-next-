import { EditFeedbackDetailProps } from "@/app/lib/type";
import { useState } from "react";

export const EditFeedbackDetail = ({
  token,
  onCancel,
  feedback,
  allFeatures,
  allScenarios,
  allStatuses,
  allPriorities,
}: EditFeedbackDetailProps) => {
  const [description, setDescription] = useState(feedback.description);
  const [selectedFeatureId, setSelectedFeatureId] = useState(
    feedback.feature.id
  );
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    feedback.testScenario.id
  );
  const [selectedStatus, setSelectedStatus] = useState(feedback.status);
  const [selectedPriority, setSelectedPriority] = useState(feedback.priority);

  // Debug: Cek data yang masuk
  console.log("allFeatures:", allFeatures);
  console.log("allFeatures:", allScenarios);
  console.log("feedback.feature.id:", feedback.feature.id);
  console.log("selectedFeatureId:", selectedFeatureId);

  return (
    <form className="text-black">
      {/* Feature Select */}
      <div className="mb-4">
        <label className="block mb-2">Feature:</label>
        <select
          value={selectedFeatureId}
          onChange={(e) => setSelectedFeatureId(parseInt(e.target.value))}
          className="border w-full p-2"
        >
          {allFeatures && allFeatures.length > 0 ? (
            allFeatures.map((feature) => (
              <option key={feature.id} value={feature.id}>
                {feature.title}
              </option>
            ))
          ) : (
            <option value="">No features available</option>
          )}
        </select>
      </div>

      {/* Scenario Select */}
      <div className="mb-4">
        <label className="block mb-2">Test Scenario:</label>
        <select
          value={selectedScenarioId}
          onChange={(e) => setSelectedScenarioId(parseInt(e.target.value))}
          className="border w-full p-2"
        >
          {allScenarios && allScenarios.length > 0 ? (
            allScenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {`${scenario.code} - ${scenario.test_case}`}
              </option>
            ))
          ) : (
            <option value="">No scenarios available</option>
          )}
        </select>
      </div>

      {/* Status Select */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border w-full p-2 rounded capitalize"
        >
          {allStatuses.map((status) => (
            <option key={status} value={status} className="capitalize">
              {status.replace("-", " ")}
            </option>
          ))}
        </select>
      </div>

      {/* Priority Select */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Priority:</label>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="border w-full p-2 rounded capitalize"
        >
          {allPriorities.map((priority) => (
            <option key={priority} value={priority} className="capitalize">
              {priority}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-2">Description:</label>
        <textarea
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full p-2"
          rows={4}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 bg-gray-200 rounded-md"
        >
          Cancel
        </button>
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-md">
          Save Changes
        </button>
      </div>
    </form>
  );
};
