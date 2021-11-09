import { all, takeLatest } from 'redux-saga/effects'
import { TransactionsAsyncActions } from 'store/actions/transactions'
import fetch from './fetch'
import update from './update'

export default function* root() {
  const { FetchBills, RemoveBill, AddBill } = TransactionsAsyncActions
  yield all([
    takeLatest(FetchBills.Types.REQUEST, fetch),
    takeLatest(RemoveBill.Types.REQUEST, update),
    takeLatest(AddBill.Types.REQUEST, update)
  ])
}