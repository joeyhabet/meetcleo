import { createSelector } from 'reselect'

export const getState = (state: any) => state.categories

export const getCategories = createSelector(
  getState,
  ({ categories }) => categories || []
)

export const getCategory = (id: number) => createSelector(
  getCategories,
  categories => categories.find((category: any) => category.id === id)
)