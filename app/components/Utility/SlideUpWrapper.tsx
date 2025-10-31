"use client";

import { motion } from "framer-motion";

/**
 * Komponen ini membungkus 'children' dan memberikan
 * animasi "slide up" + "fade in" saat pertama kali muncul.
 */
const SlideUpWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0, // Mulai dari transparan
        y: 20, // Mulai 30px di bawah posisi akhir
      }}
      animate={{
        opacity: 1, // Animasikan menjadi terlihat
        y: 0, // Animasikan ke posisi akhir (Y: 0)
      }}
      transition={{
        duration: 0.5, // Durasi animasi 0.5 detik
        ease: "easeOut", // Jenis easing
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpWrapper;
