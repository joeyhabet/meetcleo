import { call, put, delay } from 'redux-saga/effects'
import { TransactionsAsyncActions } from 'store/actions/transactions'
import { apiCall } from 'utils/apiCall'

function* fetch(action: { payload: { isBill: boolean }, type: string}) {
  const { FetchBills: { Actions: { SUCCESS, FAILURE } } } = TransactionsAsyncActions
  const { payload: { isBill } } = action
  
  try {
    yield delay(1500)
  // @ts-ignore
    const response = yield call(apiCall, `merchants?isBill=${isBill}`)
    yield put(SUCCESS(response))
  } catch (error) {
    yield put(FAILURE(error))
  }
}

export default fetch