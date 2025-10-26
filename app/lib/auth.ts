// File: lib/auth.ts atau di mana pun Anda ingin meletakkannya

import { jwtVerify, type JWTPayload } from "jose"; // Impor fungsi dan tipe dari jose

/**
 * Memverifikasi token JWT menggunakan secret key dari environment variables.
 *
 * @param token Token JWT dalam format string.
 * @returns {Promise<JWTPayload | null>} Payload token jika valid, atau null jika tidak valid/error.
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  // 1. Ambil secret key dari environment variable
  const secret = process.env.JWT_SECRET;

  // 2. Pastikan secret key ada dan tidak kosong
  if (!secret) {
    console.error(
      "Kesalahan: JWT_SECRET tidak diatur di environment variables."
    );
    return null;
  }

  try {
    // 3. Encode secret key menjadi format yang dibutuhkan jose (Uint8Array)
    const secretKey = new TextEncoder().encode(secret);

    // 4. Verifikasi token menggunakan jose
    // 'jwtVerify' akan otomatis mengecek tanda tangan dan waktu kedaluwarsa
    const { payload } = await jwtVerify(token, secretKey, {
      // Anda bisa menambahkan opsi lain di sini jika perlu,
      // misalnya 'algorithms' jika Anda menggunakan algoritma spesifik
      // algorithms: ['HS256'], // Contoh
    });

    // 5. Jika verifikasi berhasil, kembalikan payload
    console.log("Token berhasil diverifikasi, payload:", payload);
    return payload;
  } catch (error: any) {
    // 6. Tangani error verifikasi (misalnya, token expired, tanda tangan salah)
    console.error("Verifikasi token gagal:", error.message || error);
    return null;
  }
}

// (Fungsi lain terkait auth bisa ditambahkan di sini, misal membuat token)
