import { call, put } from 'redux-saga/effects'
import { CategoriesAsyncActions } from 'store/actions/categories'
import { apiCall } from 'utils/apiCall'

function* fetch() {
  const { FetchCategories: { Actions: { SUCCESS, FAILURE } } } = CategoriesAsyncActions
  
  try {
  // @ts-ignore
    const response = yield call(apiCall, `categories`)
    yield put(SUCCESS(response))
  } catch (error) {
    yield put(FAILURE(error))
  }
}

export default fetch