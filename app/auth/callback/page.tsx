import { Suspense } from "react";
import CallbackClient from "./CallbackClient";

export const dynamic = "force-dynamic";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">Verifying authentication...</p>
        <p className="text-gray-600">Please wait, redirecting you shortly.</p>
      </div>
    </div>
  );
};

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CallbackClient />
    </Suspense>
  );
}
