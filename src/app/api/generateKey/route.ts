import { NextRequest,  NextResponse } from 'next/server'

const clientId = process.env.ZOHO_CLIENT_ID
const clientSecret = process.env.ZOHO_CLIENT_SECRET
const refreshToken = process.env.ZOHO_REFRESH_TOKEN
const authKey = process.env.AUTH_KEY

export const runtime = 'edge';
export const preferredRegion = 'iad1'

export async function POST (req: NextRequest) {
  'use server'
    const key = req.nextUrl.searchParams.get("key")
    if(key === authKey) {
        const url = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=http://www.zoho.com/inventory&grant_type=refresh_token`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-cache'
        })

        if (!response.ok) {
            console.log("cannot authenticate")
            return new Response(`Failed to authenticate: ${response.statusText}`, {status: 500})
        }

        const data = await response.json()
        return NextResponse.json(data)
    }
    else {
        console.log("key doesn't match")
        return NextResponse.error()
    }
}

