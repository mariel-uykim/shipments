import { NextResponse, NextRequest } from "next/server"
import { FullOrder, Token } from "@/interfaces/interfaces"
import getBase from "../../base"

const authKey = process.env.AUTH_KEY
const orgId = process.env.ZOHO_ORGANIZATION_ID

export const runtime = 'edge';
export const preferredRegion = 'iad1'

export async function GET(req: NextRequest) {
  'use server'
    const base = await getBase()

    const id = req.nextUrl.searchParams.get("id")

    const authURL = `${base}/api/generateKey?key=${authKey}`
    

    const tokenRes = await fetch(authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 120        
      }
    })
    const tempAccess:Token = await tokenRes.json()
    const accessToken = tempAccess.access_token

    let shipmentorder:FullOrder | null = null

    try {
      const url = `https://www.zohoapis.com/inventory/v1/shipmentorders/${id}?organization_id=${orgId}`;
  
      const response = await fetch(url, {
          headers: {
              Authorization: `Zoho-oauthtoken ${accessToken}`,
              'Access-Control-Allow-Origin': url || '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
      })
  
      if (!response.ok) {
          console.log(`Failed to authenticate: ${response.statusText}`)
      }
  
      const responseData = await response.json()
      
      if(responseData.code != 0) {
        console.log('cannot fetch data')
      }
      else {
        shipmentorder = await responseData.shipmentorder
      }

    } catch (error) {
      return NextResponse.error()
    }
    return NextResponse.json(shipmentorder)
  }
