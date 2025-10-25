import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CardSkeleton, StatsGridSkeleton } from "../components/Skeleton";
import { StatsCards } from "../components/Dashboards/StatsCard";
import { CurrentProjectCard } from "../components/Dashboards/CurrentProjectCard";
import Navbar from "../components/Dashboards/Navbar";

const Dashboards = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="pt-22">
        {/* ^-- GANTI pt-24 DENGAN TINGGI NAVBAR ANDA */}

        <Suspense fallback={<StatsGridSkeleton />}>
          <StatsCards token={token} />
        </Suspense>

        {/* Kita bungkus CardProject dengan div 
          untuk memberinya padding dan judul
        */}
        <Suspense fallback={<CardSkeleton />}>
          <CurrentProjectCard token={token} />
        </Suspense>
      </main>
    </>
  );
};

export default Dashboards;
