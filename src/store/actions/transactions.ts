import { createAsyncAction } from 'utils/store'

const PREFIX_NAME = 'transactions'

export const FetchBills = createAsyncAction(PREFIX_NAME, 'fetchBills', {
    REQUEST: ['isBill'],
    SUCCESS: ['merchants']
})

export const RemoveBill = createAsyncAction(PREFIX_NAME, 'removeBill', {
    REQUEST: ['id']
})

export const AddBill = createAsyncAction(PREFIX_NAME, 'addBill', {
    REQUEST: ['id']
})

export const TransactionsAsyncActions = {
    FetchBills,
    RemoveBill,
    AddBill
}