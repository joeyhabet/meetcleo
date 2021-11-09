import { all, takeLatest } from 'redux-saga/effects'
import { CategoriesAsyncActions } from 'store/actions/categories'
import fetch from './fetch'

export default function* root() {
  const { FetchCategories } = CategoriesAsyncActions
  yield all([
    takeLatest(FetchCategories.Types.REQUEST, fetch)
  ])
}