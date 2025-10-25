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
