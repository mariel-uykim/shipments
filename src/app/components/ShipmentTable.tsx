"use client"

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Shipment } from '@/interfaces/interfaces'
import getBase from '../api/base'

interface CheckboxTableProps {
  shipments: any;
}

const dispatchers = [
  { label: "Jam", value: "Jam" },
  { label: "Jessa", value: "Jessa" },
  { label: "Kevin", value: "Kevin" },
  { label: "Mar", value: "Mar" },
  { label: "Mark", value: "Mark" },
  { label: "Roy", value: "Roy" },
  { label: "Rudy", value: "Rudy" },
] as const

const ShipmentForm: React.FC<CheckboxTableProps> = ({ shipments }) => {
  const [isSubmitting, setSubmitting] = useState(false)
  const [selectedItems, setSelectedItems] = useState<Shipment[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { push } = useRouter()



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      setSubmitting(true)
      
      event.preventDefault()

      const baseURL = await getBase()
      const idArray = selectedItems.map(obj => obj.shipment_id)
      const arrayString = idArray.join("+")

      push(`${baseURL}/shipment_results/${arrayString}`)

  }

  const handleCheckboxChange = (data: Shipment) => {
      const isSelected = selectedItems.some((item) => item.shipment_id === data.shipment_id)

      if (isSelected) {
          const updatedItems = selectedItems.filter((item) => item.shipment_id !== data.shipment_id)
          setSelectedItems(updatedItems)
      } else {
          setSelectedItems([...selectedItems, data])
      }
  }
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value)
  }

  const filteredShipments = shipments.filter((data: Shipment) => {
      const searchString = searchQuery.toLowerCase()
      const customerName = data.customer_name.toLowerCase()
      const orderNumber = data.salesorder_number.toLowerCase()

      return customerName.includes(searchString) || orderNumber.includes(searchString)
  })

  return (
  <div>
  <>
      <div className="mb-4 rounded-lg text-slate-900">
              <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Search by Customer Name or DR Number"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
              />
      </div>
      <div className="max-h-96 overflow-y-scroll">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="p-4">
                          #
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Salesorder #
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Shipment #
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Customer
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {filteredShipments.map((data: Shipment, idx:number) => {
                      return <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="w-4 p-4">
                          <div className="flex items-center">
                              <input 
                                  id={`checkbox-table-${data.shipment_id}`}
                                  type="checkbox" 
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  onChange={() => handleCheckboxChange(data)}
                                  checked={selectedItems.some((item) => item.shipment_id === data.shipment_id)}
                              />
                              <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                          </div>
                      </td>
                      {/* <td className="px-6 py-4">
                          {data.date}
                      </td> */}
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {data.salesorder_number}
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {data.shipment_number}
                      </td>
                      <td className="px-6 py-4">
                          {data.customer_name}
                      </td>
                  </tr>
                  })}
              </tbody>
          </table>
      </div>
      
      </div>
      <div className='bg-slate-100 py-8 px-10'>
          <form onSubmit={handleSubmit}>
              <button 
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                  {isSubmitting ? <p>Submitting...</p>: <p>Submit</p>}
              </button>
          </form>
      </div>
  </>
  </div>
    )
  }

  export default ShipmentForm
