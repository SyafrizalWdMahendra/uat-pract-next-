"use client";
import { HeadTitleCardProps, TitleConfig } from "@/app/lib/type";
import { Info, Send, LucideIcon, Target } from "lucide-react";

export const HeadTitleCard = ({ title }: HeadTitleCardProps) => {
  const TITLE_CONFIG: Record<string, TitleConfig> = {
    "submit-feedback": {
      icon: Send,
      title: "Submit Feedback",
      description:
        "Report issues, bugs, or provide feedback for specific features and test scenarios.",
    },
    "project-information": {
      icon: Target,
      title: "Project Information",
    },
    "test-docs": {
      icon: Info,
      title: "Test Scenarios Document",
      description:
        "Download the complete test scenarios spreadsheet with detailed step-by-step instructions for each test case",
    },
  };

  const config = TITLE_CONFIG[title];

  if (!config) {
    return null;
  }

  const IconComponent = config.icon as LucideIcon;

  return (
    <header className="mb-6">
      <div className="flex items-center justify-between mb-2 gap-4">
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5 text-popover" />
          <h1 className="text-xl font-semibold text-gray-800">
            {config.title}
          </h1>
        </div>
      </div>

      {config.description && (
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {config.description}
        </p>
      )}
    </header>
  );
};
