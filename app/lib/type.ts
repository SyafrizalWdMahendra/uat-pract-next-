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
  project_id: number;
  status: string;
  priority: string;
  description: string;
  created_at: Date | string;
  user: {
    id: number;
    name: string;
  };
  testScenario: {
    code: string;
    test_case: string;
  };
  feature: {
    project_id: number;
    id: number;
    title: string;
  };
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
    id: number;
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

export interface FeedbackDetailProps {
  feedbackId: number | string;
  token: string;
}

export interface JwtPayload {
  userId: number;
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
