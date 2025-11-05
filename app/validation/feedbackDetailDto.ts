import { z } from "zod";

export const updateDetailsSchema = z.object({
  feature_title: z.string().min(1, "Feature is required"),
  test_scenario_code: z.string(),
  test_scenario_test_case: z.string(), // ✅ tetap optional
  feedback_priority: z.string().min(1, "Priority is required"),
  feedback_status: z.string().min(1, "Status is required"),
  feedback_description: z.string().min(1, "Description is required"),
});

export type UpdateDetailsSchema = z.infer<typeof updateDetailsSchema>;
