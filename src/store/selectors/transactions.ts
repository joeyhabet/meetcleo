import { createSelector } from 'reselect'

export const getState = (state: any) => state.transactions

export const getMerchants = createSelector(
  getState,
  ({ merchants }) => merchants || []
)