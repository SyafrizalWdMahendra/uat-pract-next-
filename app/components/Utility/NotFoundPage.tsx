export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh bg-gray-50 text-center px-6">
      <h1 className="text-7xl font-extrabold text-gray-800 mb-4 animate-pulse">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Maaf, halaman yang kamu cari mungkin telah dipindahkan, dihapus, atau
        tidak pernah ada.
      </p>
      <a
        href="/"
        className="px-6 py-3 rounded-lg bg-gray-800 text-white font-medium hover:bg-black transition-all shadow-md hover:shadow-lg"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
};
