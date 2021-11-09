import { all, fork } from 'redux-saga/effects'
import transactions from './transactions'
import categories from './categories'

const rootSaga = function* root() {
  yield all([
    fork(transactions),
    fork(categories)
  ])
}

export default rootSaga