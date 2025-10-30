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
  project_id: number;
  status: string;
  priority: string;
  description: string;
  created_at: Date | string;
  user: {
    name: string;
  };
  testScenario: {
    code: string;
  };
  feature: {
    project_id: any;
    id: any;
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
  initialScenarios?: any[] | null;
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
