import { combineReducers } from 'redux'
import transactions from './transactions'
import categories from './categories'

export default combineReducers({
    transactions,
    categories
})