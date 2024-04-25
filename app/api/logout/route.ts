import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const cookieStore = cookies();
    const credential = cookieStore.get(cookieName);

    if(!credential) {
        return NextResponse.json(
            {
                message: "Token not found",
            },
            {
                status: 400,
            }
        );
    }

    const refreshToken = credential.value;

    if(credential) {
        cookieStore.delete(cookieName)

        return NextResponse.json({
            message: "Logout successfully"
        }, {
            status:200
        })
    }
    // If the refresh token is not found, return an error message to the client-side
    return NextResponse.json(
        {
            message: "Failed to logout",
        },
        {
            status: 400,
        }
    );

}