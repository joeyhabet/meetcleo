declare namespace cleo {
  type Transaction = {
    amount: number
    date: string
    id: number
  }

  type Merchant = {
    categoryId: number
    iconUrl: string
    id: string
    isBill: boolean
    name: string
    transactions: Transaction[]
  }
}