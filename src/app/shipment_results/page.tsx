import React from 'react'
import getBase from '@/app/api/base'
import ShipmentSlip from '../components/ShipmentSlip'
import { FullShipment } from '@/interfaces/interfaces'
// import getShipment from '@/app/actions/getShipment'

const getShipment  = async (id: string) => {
  const base = await getBase()
  const response = await fetch(`${base}/api/shipment/${id}`)
  const data = await response.json()
  return data
}

const page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const query = searchParams?.q
  const idArray: string[] = query ? (query as string).split(" ") : []
  const shipments : FullShipment[] = await Promise.all(idArray.map(async (id:string) => {
    return await getShipment(id)
  }))
  
  return (
    <div className=' bg-orange-400 p-5'>
      <ShipmentSlip shipment={shipments}/>
    </div>
  )
}

export default page