'use client'
import { useState, useRef } from 'react';
import ReactToPrint from "react-to-print"
import { FullShipment } from '@/interfaces/interfaces';

type ShipmentSlipProps = {
    shipment: FullShipment[];
  };

const ShipmentSlip = ({ shipment }: ShipmentSlipProps) => {
  const componentRef = useRef<HTMLDivElement>(null)
    if (shipment.length === 0 && shipment) {
        return(
            <div>
                <p>Nothing to print!</p>
            </div>
        )
    }

  return (
    <div>
      <div className='bg-white text-black w-3/5 px-4 py-2 text-sm' ref={componentRef}>
        {shipment.map((ship) => (
          <div key={ship.salesorder_id}>
            <h2 className="font-bold text-md text-center py-2">Cocomart Dispatch Slip</h2>
            <div className="grid grid-cols-2 gap-4">
                {ship && ship.custom_fields && ship.custom_fields?.map((cf) => {
                    return <h4 className="p-1 text-center" key={cf.label}>{cf.label}:{cf.value}</h4>
                })}
                <h4 className="p-1 text-center">date:{ship.date && ship.date.toString()}</h4>
            </div>
            <div>
              <div className='flex justify-center'>
                <h4 className='text-sm font-semibold'>{ship.salesorder_number}  | {ship.shipment_number}</h4>
              </div>
            </div>
            <div className='text-center'>______________________________</div>
            <div>
              {ship.line_items && ship.line_items.slice().sort((a, b) => a.name.localeCompare(b.name)).map((item) => (
                <div key={item.item_id} className="flex justify-between">
                  <span className="mr-2">{item.name}</span>
                  <span>{item.quantity}</span>
                </div>
              ))}
            </div>
            <div className='my-5 text-xs flex flex-col'>
              <p className='mb-2'>Dispatched by:____________________</p>
              <p>Date signed:____________________</p>
            </div>
          </div>
        ))}
        
      </div>

      <ReactToPrint
                trigger={() => <a><button className="my-10 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Print</button></a>}
                content={() => componentRef.current}
            />
        
    </div>
  )
}

export default ShipmentSlip