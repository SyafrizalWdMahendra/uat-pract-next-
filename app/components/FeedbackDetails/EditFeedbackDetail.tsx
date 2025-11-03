"use client";

import { EditFeedbackDetailProps } from "@/app/lib/type";
import SlideUpWrapper from "../Utility/SlideUpWrapper";
import { Save, X } from "lucide-react";
import { useEditFeedbackDetail } from "@/app/hooks/FeedbackDetails/useEditFeedbakDetail";

export const EditFeedbackDetail = (props: EditFeedbackDetailProps) => {
  const {
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
    setSelectedPriority,
    setSelectedScenarioId,
    setSelectedStatus,
  } = useEditFeedbackDetail(props);

  return (
    <SlideUpWrapper>
      <form className="text-black space-y-6" onSubmit={handleSubmit}>
        {/* Feature Select */}
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
            onChange={handleFeatureChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
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
        </div>

        {/* Scenario Select */}
        <div>
          <label
            htmlFor="scenario-select"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Test Scenario (Optional)
          </label>
          <select
            id="scenario-select"
            value={selectedScenarioId}
            onChange={(e) => setSelectedScenarioId(e.target.value)}
            disabled={availableScenarios.length === 0}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">-- Select Scenario (Optional) --</option>
            {availableScenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {`${scenario.code} - ${scenario.test_case}`}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Gunakan Grid untuk Status & Priority di desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Select */}
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
          </div>

          {/* Priority Select */}
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
          </div>
        </div>

        {/* Description */}
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
        </div>

        {/* 4. Perbarui styling tombol dan layout (mobile-first) */}
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
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center text-sm gap-2 px-4 py-2 bg-gray-800 hover:bg-black text-white font-medium rounded-md disabled:bg-gray-300 hover:cursor-pointer w-full sm:w-auto"
          >
            <Save className="w-4 h-4"></Save>
            <span>{isSubmitting ? "Updating..." : "Save Changes"}</span>
          </button>
        </div>

        {/* Tampilkan error jika ada */}
        {errorMessage && (
          <div className="text-red-600 text-sm mt-2">
            <p>Error: {errorMessage}</p>
          </div>
        )}
      </form>
    </SlideUpWrapper>
  );
};
