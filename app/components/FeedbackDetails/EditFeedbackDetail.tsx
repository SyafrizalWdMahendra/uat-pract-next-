"use client";

import { onSubmitUpdate } from "@/app/lib/FeedbackDetail/fetch";
import { EditFeedbackDetailProps } from "@/app/lib/type";
import { FormEvent, useState, useMemo, ChangeEvent } from "react";
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
    setSelectedFeatureId,
    setSelectedPriority,
    setErrorMessage,
    setSelectedScenarioId,
    setSelectedStatus,
  } = useEditFeedbackDetail(props);
  return (
    <SlideUpWrapper>
      <form className="text-black space-y-4" onSubmit={handleSubmit}>
        {/* Feature Select */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Feature:</label>
          <select
            value={selectedFeatureId}
            onChange={handleFeatureChange}
            className="border w-full p-2 rounded-md bg-white"
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
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Test Scenario (Optional):
          </label>
          <select
            value={selectedScenarioId}
            onChange={(e) => setSelectedScenarioId(e.target.value)}
            disabled={availableScenarios.length === 0}
            className="border w-full p-2 rounded-md bg-white disabled:bg-gray-100"
          >
            <option value="">-- Select Scenario (Optional) --</option>
            {availableScenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {`${scenario.code} - ${scenario.test_case}`}
              </option>
            ))}
          </select>
        </div>

        {/* Status Select */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border w-full p-2 rounded-md bg-white capitalize"
          >
            {props.allStatuses.map((status) => (
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
            className="border w-full p-2 rounded-md bg-white capitalize"
          >
            {props.allPriorities.map((priority) => (
              <option key={priority} value={priority} className="capitalize">
                {priority}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Description:</label>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            className="border w-full p-2 rounded-md"
            rows={4}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 lg:justify-start sm:w-full">
          <button
            type="button"
            onClick={props.onCancel}
            disabled={isSubmitting}
            className="flex gap-2 justify-center items-center p-2 bg-gray-200 text-sm rounded-md lg:w-max md:w-max disabled:opacity-50 hover:cursor-pointer w-full"
          >
            <X className="w-4 h-4"></X>
            <p>Cancel</p>
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex justify-center items-center text-sm gap-2 p-2 bg-gray-900 text-white rounded-md lg:w-max md:w-max disabled:bg-gray-200 hover:cursor-pointer w-full"
          >
            <Save className="w-4 h-4"></Save>
            {isSubmitting ? "Updating..." : "Save Changes"}
          </button>
        </div>

        {/* Tampilkan error jika ada */}
        {errorMessage && (
          <div className="text-red-600 mt-2">
            <p>{errorMessage}</p>
          </div>
        )}
      </form>
    </SlideUpWrapper>
  );
};
