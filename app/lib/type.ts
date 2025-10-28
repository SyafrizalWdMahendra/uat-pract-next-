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
  description: string | null; // Deskripsi bisa null
  priority: string;
  status: string;
  start_date: string; // String (sudah diformat backend)
  due_date: string; // String (sudah diformat backend)
  duration: number | null; // Number atau null
  manager: IUserSummary;
  testLead: IUserSummary;
  features: IFeature[]; // Array dari fitur (yang berisi skenario)
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
  test_case: string;
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
