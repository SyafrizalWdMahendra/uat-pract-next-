import { jwtVerify, type JWTPayload } from "jose";

/**
 * Memverifikasi token JWT menggunakan secret key dari environment variables.
 *
 * @param token Token JWT dalam format string.
 * @returns {Promise<JWTPayload | null>} Payload token jika valid, atau null jika tidak valid/error.
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error(
      "Kesalahan: JWT_SECRET tidak diatur di environment variables.",
    );
    return null;
  }

  try {
    const secretKey = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, secretKey, {});

    console.log("Token berhasil diverifikasi, payload:", payload);
    return payload;
  } catch (error: any) {
    console.error("Verifikasi token gagal:", error.message || error);
    return null;
  }
}
