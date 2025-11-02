import { API_BASE_URL, DEFAULT_FILTER_OPTIONS } from "@/app/utils/cons";
import { Feature, Scenario } from "../type";


const fetchFeatures = async (
  projectId: number,
  token: string
): Promise<Feature[]> => {
  try {
    const url = `${API_BASE_URL}/api/features?projectId=${projectId}`;

    console.log("🔍 Fetching features from:", url);
    console.log("🎯 Project ID:", projectId);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      return [];
    }

    const result = await response.json();
    console.log("📦 Raw API response:", result);

    const features = result?.payload.data || result?.features || result || [];

    if (!Array.isArray(features)) {
      console.warn("⚠️ Features is not an array:", features);
      return [];
    }

    console.log("✅ Features loaded:", features.length, "items");
    return features;
  } catch (error) {
    console.error("❌ Error fetching features:", error);
    return [];
  }
};

const fetchScenarios = async (token: string): Promise<Scenario[]> => {
  try {
    const url = `${API_BASE_URL}/api/scenarios`;

    console.log("🔍 Fetching scenario from:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Error details:", errorText);
      return [];
    }

    const result = await response.json();
    console.log("📦 Raw API response:", result);

    const features =
      result?.payload.data || result?.testScenario || result || [];

    if (!Array.isArray(features)) {
      console.warn("⚠️ Features is not an array:", features);
      return [];
    }

    console.log("✅ Features loaded:", features.length, "items");
    return features;
  } catch (error) {
    console.error("❌ Error fetching features:", error);
    return [];
  }
};

export { fetchFeatures, fetchScenarios };
