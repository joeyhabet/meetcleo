import { CategoriesAsyncActions } from 'store/actions/categories'
import { createReducerFromActions } from 'utils/store'
import { values } from 'lodash'

export default createReducerFromActions(...values(CategoriesAsyncActions))