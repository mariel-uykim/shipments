import { NextResponse, NextRequest } from "next/server"
import { Shipment, Token } from "@/interfaces/interfaces"
import getBase from "../base";

const authKey = process.env.AUTH_KEY
const orgId = process.env.ZOHO_ORGANIZATION_ID

export const runtime = 'edge';
export const preferredRegion = 'iad1'

async function fetchAllShipments(accessToken:string, pageNo = 1): Promise<Shipment[]> {
  'use server'
    const Shipments: Shipment[] = []

    try {
      const url = `https://www.zohoapis.com/inventory/v1/shipmentorders?page=${pageNo}&per_page=200&organization_id=${orgId}`

      const response = await fetch(url, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            },
            next: { revalidate: 1000 }
        })

      if (!response.ok) {
        console.log(`Failed to fetch shipments: ${response.statusText}, ${response.headers}`)
      }
      else {
      const responseData = await response.json()

        if (responseData.shipmentorders) {
            Shipments.push(...responseData.shipmentorders);
        }  

        if (responseData.page_context.has_more_page && pageNo <= 1) {
            const nextPageShipments = await fetchAllShipments(accessToken, pageNo + 1);
            Shipments.push(...nextPageShipments);
        }
      }
    } catch (error) {
        console.error(error);
    }
    
    return Shipments;
  }

export async function GET(req: NextRequest) {
  'use server'
    const base = await getBase()

    const authURL = `${base}/api/generateKey?key=${authKey}`
    
    const tokenRes = await fetch(authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 200        
      }
    })
    const tempAccess:Token = await tokenRes.json()
    const accessToken = tempAccess.access_token

    const shipments = await fetchAllShipments(accessToken)

    return NextResponse.json(shipments)
  }