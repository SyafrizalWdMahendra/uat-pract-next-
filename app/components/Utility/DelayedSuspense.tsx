// "use client";
// import { ReactNode, useEffect, useState } from "react";

// type DelayedSuspenseProps = {
//   children: ReactNode;
//   fallback: ReactNode;
//   delay?: number; // ms
// };

// const DelayedSuspense = ({
//   children,
//   fallback,
//   delay = 1000,
// }: DelayedSuspenseProps) => {
//   const [showFallback, setShowFallback] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowFallback(false), delay);
//     return () => clearTimeout(timer);
//   }, [delay]);

//   return <>{showFallback ? fallback : children}</>;
// };

// export default DelayedSuspense;
