import { call, put } from 'redux-saga/effects'
import { TransactionsAsyncActions } from 'store/actions/transactions'
import { apiCall } from 'utils/apiCall'

function* update(action: { payload: { id: string }, type: string}) {
  const { payload: { id }, type } = action

  const isAdding = type === TransactionsAsyncActions.AddBill.Types.REQUEST

  try {
    // @ts-ignore
    const oldData = yield call(apiCall, `merchants/${id}`)
    // @ts-ignore
    const response = yield call(apiCall, `merchants/${id}`, 'put', { ...oldData, isBill: isAdding })

    yield put(isAdding ? TransactionsAsyncActions.AddBill.Actions.SUCCESS(response) : TransactionsAsyncActions.RemoveBill.Actions.SUCCESS(response))
  } catch (error) {
    yield put(isAdding ? TransactionsAsyncActions.AddBill.Actions.FAILURE(error) : TransactionsAsyncActions.RemoveBill.Actions.FAILURE(error))
  }
}

export default update