import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtPayload, Scenario, Feature as CustomFeature } from "../type";
import { getFeatures, getScenarios } from "../data";

export const dynamic = "force-dynamic";

function extractData(response: any): any[] {
  if (response && response.payload && Array.isArray(response.payload.data)) {
    return response.payload.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.data)) {
    return response.data;
  }
  return [];
}

export const GetProjectCookies = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const projectId = Number((await params).id);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  let loggedInUserId: number | undefined = undefined;

  try {
    const decodedToken: JwtPayload = jwtDecode(token);
    loggedInUserId = decodedToken.userId;
  } catch (error) {
    console.error("Server Page: Gagal decode token:", error);
    redirect("/login");
  }

  const [featuresResponse, scenariosResponse] = await Promise.all([
    getFeatures(projectId, token),
    getScenarios(token),
  ]);

  const initialFeatures = extractData(featuresResponse) as CustomFeature[];
  const initialScenarios = extractData(scenariosResponse) as Scenario[];

  return {
    initialFeatures,
    initialScenarios,
    featuresResponse,
    scenariosResponse,
    loggedInUserId,
    token,
    projectId,
  };
};
