"use client";

import { Info, File, Check, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";
import { TestScenarioDocumentCardProps } from "@/app/lib/type";
import { useScenarioDoc } from "@/app/hooks/Scenarios/useScenarioDocs";

const TestScenarioDocCard = ({
  projectId,
  token,
}: TestScenarioDocumentCardProps) => {
  const { docUrl, isLoading, error } = useScenarioDoc(projectId, token);

  const renderLinkButton = () => {
    if (isLoading) {
      return (
        <div className="items-center flex-row justify-center bg-gray-100 border-gray-400 border flex rounded-md pt-2 pl-4 pb-2 pr-4 gap-4">
          <p className="text-gray-500 text-sm font-medium">Loading link...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div
          className="items-center flex-row justify-center bg-red-50 border-red-400 border flex rounded-md pt-2 pl-4 pb-2 pr-4 gap-4"
          title={error}
        >
          <p className="text-red-600 text-sm font-medium">Error loading link</p>
        </div>
      );
    }

    if (!docUrl) {
      return (
        <div className="items-center flex-row justify-center bg-gray-100 border-gray-400 border flex rounded-md pt-2 pl-4 pb-2 pr-4 gap-4">
          <p className="text-gray-500 text-sm font-medium">
            Document not available
          </p>
        </div>
      );
    }

    return (
      <Link
        className="hover:bg-blue-900/20 w-full hover:rounded-sm"
        href={docUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="items-center flex-row justify-center bg-transparent border-blue-900 border flex rounded-md pt-2 pl-4 pb-2 pr-4 gap-4">
          <motion.div
            className="box w-2.5 h-2.5 rounded-lg flex items-center"
            animate={{ scale: 2 }}
            whileInView={{ opacity: 1 }}
            layout
            whileHover={{ scale: 2.5, transition: { duration: 0.3 } }}
          >
            <ArrowRightCircle className="text-gray-700 w-6 h-6"></ArrowRightCircle>
          </motion.div>
          <p className="text-gray-700 text-sm font-medium">Preview</p>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg mb-3">
        <div className="flex items-center mb-6">
          <div className="w-full">
            <div className="flex">
              <File className="w-5 h-6 text-blue-900 mr-2" />
              <h1 className="text-xl font-semibold text-gray-800">
                Test Scenarios Documentation
              </h1>
            </div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-2">
              Download the complete test scenarios spreadsheet with detailed
              step-by-step instructions for each test case
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-cols-3 gap-5 ">
          <div className="bg-blue-900/20 border border-blue-900 p-4 rounded-lg md:flex items-center justify-between gap-5 h-max">
            <div className="p-3 w-full md:w-auto text-gray-700">
              <div className="flex-col lg:w-full">
                <p className="text-md font-medium ">
                  Test Scenarios Spreadsheet
                </p>
                <p className="text-sm font-light mt-1 ">
                  Contains all {projectId == 2 ? "525" : "225"} test scenarios
                  with detailed steps, expected results, and acceptance
                  criteria.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-3 ">
                <div className="flex lg:w-max items-center">
                  <Check className="w-7 h-6 mr-2"></Check>
                  <p className="text-sm">Step-by-step instructions</p>
                </div>
                <div className="flex lg:w-max items-center">
                  <Info className="w-5 h-6 mr-2"></Info>
                  <p className="text-sm">Expected Result</p>
                </div>
                <div className="flex lg:w-max items-center">
                  <Check className="w-7 h-6 mr-2"></Check>
                  <p className="text-sm">Acceptance Criteria</p>
                </div>
              </div>
            </div>

            <div className="flex h-max items-center w-full md:w-auto justify-center md:justify-start mt-4 md:mt-0">
              {renderLinkButton()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestScenarioDocCard;
