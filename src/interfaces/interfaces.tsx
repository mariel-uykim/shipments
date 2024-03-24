export interface SalesOrder {
    salesorder_number: string,
    salesorder_id: string,
    customer_name: string,
    date: string,
    status: string
}

export interface Item {
    item_id: string,
    sku: string,
    name: string,
    quantity: number
}

export interface Address {
    address: string,
    city: string,
    state: string
}

export interface FullOrder extends SalesOrder {
    line_items: Item[]
    billing_address: Address
}

export interface Package extends SalesOrder {
    package_id: string,
    package_number: string
}

export interface FormData {
    id: string,
    driver: string
    truckNo: string
    date: Date | undefined
    salesOrders: SalesOrder[],
    ordersID: string
}

export interface PackageFormData extends FormData {
    dispatcher: string,
    packages: Package[]
}

export interface Token {
    access_token: string
    api_domain: string
    token_type: string
    expires_in: string
}

export interface SearchParams {
    q: string[]
    truck: string
    driver: string
    date: Date
}

export interface DBInterface {
    q: string[]
    truck: string
    driver: string
    date: Date
}

export interface ResultsParams {
    q: FullOrder[]
    truck: string
    driver: string
    id: string
    ordersID: string
    date: Date
}
export interface OrdersSchema {
    id?: string
    ordersID: string
    driver: string
    truck: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
    deliveryDate: Date
    orders: string[]
    status: string
}

export interface FullOrdersSchema {
    id?: string
    ordersID: string
    driver: string
    truck: string
    createdBy: string
    createdAt: Date
    updatedAt: Date
    deliveryDate: Date
    orders: SalesOrder[]
}
export interface userSchema {
    username: string
    password: string
    role: string
}

export interface DispatchSchema {
  id: string,
  countID: number,
  soID: string,
  driver: string,
  truckNo: string,
  dispatchedOn: Date,
  dispatcher: string
}

export interface Shipment {
    shipment_number: string,
    shipment_id: string,
    salesorder_id: string,
    salesorder_number: string,
    customer_name: string,
    status: string,
    date: Date,
    carrier: string
}

export interface ShipmentItem {
    item_id: string,
    name: string,
    quantity: number
}

export interface ShipmentCustom {
    label: string,
    value: string
}
export interface FullShipment extends Shipment {
    shipment_status: string,
    line_items: ShipmentItem[],
    custom_fields: ShipmentCustom[]
}