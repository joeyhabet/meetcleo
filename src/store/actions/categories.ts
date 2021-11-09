import { createAsyncAction } from 'utils/store'

const PREFIX_NAME = 'categories'

export const FetchCategories = createAsyncAction(PREFIX_NAME, 'fetchCategories', {
    SUCCESS: ['categories']
})

export const CategoriesAsyncActions = {
  FetchCategories
}