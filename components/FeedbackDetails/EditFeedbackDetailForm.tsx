import { useEditFeedbackDetail } from "@/hooks/FeedbackDetails/useEditFeedbakDetail";
import { EditFeedbackDetailProps } from "@/utils/type";
import { Save, X } from "lucide-react";

export const EditFeedbackDetailForm = (props: EditFeedbackDetailProps) => {
  const {
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
    setSelectedPriority,
    setSelectedScenarioId,
    setSelectedStatus,
    setSelectedFeatureId,
  } = useEditFeedbackDetail(props);

  return (
    <form className="text-black space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="feature-select"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Feature
        </label>
        <select
          id="feature-select"
          value={selectedFeatureId}
          onChange={(e) => {
            setSelectedFeatureId(e.target.value);
            setSelectedScenarioId("");
          }}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Select a Feature</option>
          {props.allFeatures && props.allFeatures.length > 0 ? (
            props.allFeatures.map((feature) => (
              <option key={feature.id} value={feature.id}>
                {feature.title}
              </option>
            ))
          ) : (
            <option value="">No features available</option>
          )}
        </select>
        {fieldErrors.feature_title && (
          <p className="text-sm text-red-600">{fieldErrors.feature_title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="scenario-select"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Test Scenario
        </label>
        <select
          id="scenario-select"
          value={selectedScenarioId}
          onChange={(e) => setSelectedScenarioId(e.target.value)}
          disabled={availableScenarios.length === 0}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">Select a Scenario</option>
          {availableScenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {`${scenario.code} - ${scenario.test_case}`}
            </option>
          ))}
        </select>
        {fieldErrors.test_scenario_code && (
          <p className="text-sm text-red-600">
            {fieldErrors.test_scenario_code}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="status-select"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize"
          >
            {props.allStatuses.map((status) => (
              <option key={status} value={status} className="capitalize">
                {status.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          {fieldErrors.feedback_status && (
            <p className="text-sm text-red-600">
              {fieldErrors.feedback_status}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="priority-select"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Priority
          </label>
          <select
            id="priority-select"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 capitalize"
          >
            {props.allPriorities.map((priority) => (
              <option key={priority} value={priority} className="capitalize">
                {priority}
              </option>
            ))}
          </select>
          {fieldErrors.feedback_priority && (
            <p className="text-sm text-red-600">
              {fieldErrors.feedback_priority}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="description-textarea"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description-textarea"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          rows={5}
        />
        {fieldErrors.feedback_description && (
          <p className="text-sm text-red-600">
            {fieldErrors.feedback_description}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-start gap-3 pt-2">
        <button
          type="button"
          onClick={props.onCancel}
          disabled={isSubmitting}
          className="flex gap-2 justify-center items-center px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-md disabled:opacity-50 hover:bg-gray-200 hover:cursor-pointer w-full sm:w-auto  focus-visible:outline-offset-2 focus-visible:outline-gray-400"
        >
          <X className="w-4 h-4"></X>
          <span>Cancel</span>
        </button>
        <button
          disabled={isSubmitting}
          className="flex justify-center items-center text-sm gap-2 px-4 py-2 bg-gray-800 hover:bg-black text-white font-medium rounded-md disabled:bg-gray-300 hover:cursor-pointer w-full sm:w-auto"
        >
          <Save className="w-4 h-4"></Save>
          <span>{isSubmitting ? "Updating..." : "Save Changes"}</span>
        </button>
      </div>

      {errorMessage && (
        <div className="text-red-600 text-sm mt-2">
          <p>Error: {errorMessage}</p>
        </div>
      )}
    </form>
  );
};
