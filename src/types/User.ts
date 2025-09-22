export interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  status: 'active' | 'inactive'
  address: {
    street: string
    city: string
    zipcode: string
  }
}
