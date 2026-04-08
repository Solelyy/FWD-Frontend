import { verifyToken } from "@/features/auth/server/auth-server";

export async function GET() {
    const user = await verifyToken();
    return Response.json(user);
}