import { TransactionsAsyncActions } from 'store/actions/transactions'
import { createReducerFromActions } from 'utils/store'
import { values } from 'lodash'

export default createReducerFromActions(...values(TransactionsAsyncActions))