import { jwtVerify, type JWTPayload } from "jose";

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error(
      "Kesalahan: JWT_SECRET tidak diatur di environment variables."
    );
    return null;
  }

  try {
    const secretKey = new TextEncoder().encode(secret);

    const { payload } = await jwtVerify(token, secretKey, {});

    console.log("Token berhasil diverifikasi, payload:", payload);
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Verifikasi token gagal:", error.message);
    } else {
      console.error("Verifikasi token gagal:", String(error));
    }
    return null;
  }
}
