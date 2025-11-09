import { LucideIcon } from "lucide-react";

export interface IStats {
  activeProjects: number;
  totalFeatures: number;
  totalTestScenarios: number;
}

export interface IProject {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  featureCount: number;
  testScenarioCount: number;
  duration: string;
  due_date: string;
}

export interface IProjectDetail {
  id: number;
  manager_id: number;
  test_lead_id: number;
  title: string;
  description: string | null;
  priority: string;
  status: string;
  start_date: string;
  due_date: string;
  duration: number | null;
  manager: IUserSummary;
  testLead: IUserSummary;
  features: IFeature[];
  featureCount: number;
  testScenarioCount: number;
}

export interface IUserSummary {
  name: string;
  role: string;
}

export interface ITestScenario {
  id: number;
  title: string;
}

export interface IFeature {
  id: number;
  name: string;
  testScenarios: ITestScenario[];
}

export interface Feature {
  id: number;
  project_id: number;
  title: string;
}

export interface Scenario {
  id: number;
  feature_id: number;
  code: string;
  test_case: string;
}

export interface ScenarioDocs {
  id: number;
  project_id: number;
  code_url: string;
}

export interface FeedbackPayload {
  user_id: number;
  project_id: number;
  feature_id: number;
  test_scenario_id: number | null;
  description: string;
  status: string;
  priority: string;
}

export interface FeedbackHistoryPayload {
  id: number;
  user_id: number;
  project_id: number;
  feature_id: number;
  test_scenario_id: number;
  status: string;
  priority: string;
  description: string;
  created_at: Date | string;
  updated_at: Date | string;
  user: {
    id: number;
    name: string;
  };
  testScenario: {
    id: number;
    code: string;
    test_case: string;
  };
  feature: {
    id: number;
    project_id: number;
    title: string;
  };
  token: string;
}

export interface FilterOptions {
  features: Feature[];
  priorities: string[];
  statuses: string[];
}

export interface HistoryFeedbackProps {
  projectId: number;
  token: string;
  initialFeatures?: Feature[] | null;
  initialScenarios?: Scenario[] | null;
  userId?: number;
  showAllFeedback?: boolean;
}

export type SubmitStatus = "success" | "error" | null;

export interface SubmitFeedbackCardProps {
  projectId: number;
  userId?: number;
  token: string;
  initialFeatures: Feature[] | null;
  initialScenarios: Scenario[] | null;
}

export interface TestScenarioDocumentCardProps {
  projectId: number;
  token: string;
}

export interface ScenarioDocData {
  id: number;
  project_id: number;
  doc_url: string;
}

export interface FeedbackHistoryId {
  token: string;
  id: number;
  user_id: number;
  test_scenario_id: number;
  feature_id: number;
  project_id: number;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  user: {
    name: string;
  };
  testScenario: {
    code: string;
    test_case: string;
  };
  feature: {
    title: string;
  };
}

export interface FeedbackSectionProps {
  projectId: number;
  token: string;
  userId?: number;
  initialFeatures: Feature[] | null;
  initialScenarios: Scenario[] | null;
}

export interface FeedbackData {
  id?: number;
  user_id?: number;
  test_scenario_id?: number;
  feature_id?: number;
  project_id: number;
  description: string;
  status: string;
  priority: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    id: number;
    name: string;
  };
  testScenario?: {
    code: string;
    test_case: string;
  };
  feature?: {
    title: string;
  };
}

export interface FeedbackDetailProps {
  feedback: FeedbackHistoryPayload;
  token: string;
  onEditClick: () => void;
}

export interface EditFeedbackDetailProps {
  feedback: FeedbackHistoryPayload;
  token: string;
  onCancel: () => void;
  allFeatures: Feature[];
  allScenarios: Scenario[];
  allStatuses: string[];
  allPriorities: string[];
  onUpdateSuccess: (updatedFeedback: FeedbackHistoryPayload) => void;
}

export interface JwtPayload {
  id?: number;
  userId: number;
  user_id?: number;
  sub?: number | string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export interface UserPayload {
  userId: number | string;
  email: string;
  name?: string;
}

export interface UpdatedSubmitProps extends SubmitFeedbackCardProps {
  onFeedbackSubmitted: () => void;
}

export interface UpdatedHistoryProps extends HistoryFeedbackProps {
  feedbacks: FeedbackHistoryPayload[];
  isLoading: boolean;
  error: string | null;
}

export interface NavbarProps {
  title: string;
  description?: string;
  priority?: string;
}

export interface CardStatsProps {
  title: string;
  value: number | string;
}

export interface CardProjectProps extends IProject {
  href: string;
}

export interface BackButtonProps {
  onClick?: () => void;
}

export interface ClientPageProps {
  initialFeedback: FeedbackHistoryPayload;
  token: string;
  allFeatures: Feature[];
  allTestScenario: Scenario[];
  allStatuses: string[];
  allPriorities: string[];
}

export interface DeleteFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export interface CustomModalProps extends DeleteFeedbackModalProps {
  errorMessage?: string | null;
}

export interface FormState {
  success: boolean;
  message: string;
}

export interface FeedbackTableRowProps {
  feedback: FeedbackHistoryPayload;
  onDeleteSuccess?: (feedbackId: number) => void;
}

interface ApiResponse<T> {
  payload?: {
    data: T[];
  };
  data?: T[];
}

export type ResponseType<T> = ApiResponse<T> | T[] | unknown;

export interface ActionState {
  status: SubmitStatus;
  message: string;
}

export type TitleConfig = {
  icon: LucideIcon;
  title: string;
  description?: string;
  counter?: number | string;
  showCounter?: boolean;
};

export type HeadTitleCardProps = {
  title: "submit-feedback" | "project-information" | "test-docs";
};
