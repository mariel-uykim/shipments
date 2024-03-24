import getBase from '../api/base'
import ShipmentTable from '../components/ShipmentTable'
import { Shipment } from '@/interfaces/interfaces'

async function getOrders() {

  const base = await getBase()
  const response = await fetch(`${base}/api/shipments`)

  const data = await response.json()
  return data
}

export default async function Home() {

  const shipments : Shipment[] = await getOrders()

  try{

  if(shipments) {
    return <div className='px-10 py-6 bg-orange-400'>
      <header className='flex flex-col items-center justify-center'>
        <h1 className="text-4xl font-bold">Shipments</h1>
      </header>
      <main className='py-5'>
        <ShipmentTable shipments={shipments}/>
      </main>
    </div>
  }
  
  else {
    return <div>
      <p>Loading...</p>
    </div>
  }
  }
  catch (e) {
    return <div> Cannot fetch page</div>
  }
}