"use client";

import { ChangeEvent } from "react";
import { UpdatedSubmitProps } from "@/app/lib/type";
import { Send } from "lucide-react";
import { useSubmitFeedback } from "@/app/hooks/Feedbacks/useSubmitFeedback";

const SubmitFeedbackCard = (props: UpdatedSubmitProps) => {
  const {
    featuresList,
    availableScenarios,
    selectedFeatureId,
    selectedTestScenarioId,
    description,
    isSubmitting,
    isButtonDisabled,
    handleFeatureChange,
    setDescription,
    setSelectedTestScenarioId,
    formAction,
  } = useSubmitFeedback(props);

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
          <form action={formAction}>
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
                disabled={isButtonDisabled}
                className={`
                      flex rounded-md pt-2 pl-4 pb-2 pr-4 gap-3 justify-center items-center 
                      font-medium text-white transition-colors w-full xs:w-max md:w-max
                      ${
                        isButtonDisabled
                          ? "bg-blue-900/20 cursor-not-allowed"
                          : "bg-gray-800 hover:bg-black hover:text-white cursor-pointer"
                      }
                    `}
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting ? "Submitting..." : "Submit Feedback"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SubmitFeedbackCard;
