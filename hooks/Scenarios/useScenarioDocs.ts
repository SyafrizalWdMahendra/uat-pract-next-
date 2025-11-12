"use client";

import { useState, useEffect } from "react";
import { ScenarioDocData } from "@/utils/type";
import { API_BASE_URL } from "@/utils/cons";

export const useScenarioDoc = (projectId: number, token: string) => {
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId || !token) {
      setIsLoading(false);
      return;
    }

    const fetchDocUrl = async () => {
      setIsLoading(true);
      setError(null);
      setDocUrl(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/scenarioDocs/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch document: ${response.statusText}`);
        }

        const result: { payload: { data: ScenarioDocData } } =
          await response.json();

        if (result.payload?.data?.doc_url) {
          setDocUrl(result.payload.data.doc_url);
        } else {
          throw new Error("Document URL not found in API response.");
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        console.error("Error fetching document URL:", message);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocUrl();
  }, [projectId, token]);

  return { docUrl, isLoading, error };
};
