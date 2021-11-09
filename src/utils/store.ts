import { merge } from 'lodash'
import get from 'lodash/get'
import set from 'lodash/set'
import { captialize } from './string'
import { createSelector } from 'reselect'

type AsyncActionTypes = {
  REQUEST: string
  SUCCESS: string
  FAILURE: string
  RESET: string
}

type Action = (...payload: any[]) => {
  type: string
  payload: { [key: string]: any }
}

type AsyncAction = {
  Actions: {
    REQUEST: Action
    SUCCESS: Action
    FAILURE: Action
    RESET: Action
  }
  Types: AsyncActionTypes
  Name: string
  StatusSelector: () => ((state: any) => {
      isLoading: boolean;
      isLoaded: boolean;
      errorMessage: string | undefined;
  })
}

export const createAsyncAction = (prefix: string, name: string, params?: {
  REQUEST?: string[]
  SUCCESS?: string[]
  FAILURE?: string[]
  RESET?: string[]
}): AsyncAction => {
  const defaultParams = {
    REQUEST: [],
    SUCCESS: [],
    FAILURE: ['error'],
    RESET: []
  }

  const { REQUEST: paramsForRequest, SUCCESS: paramsForSuccess, FAILURE: paramsForFailure, RESET: paramsForReset } = merge({}, params, defaultParams)

  const Types = {
    REQUEST: `${prefix}.${name}.REQUEST`,
    SUCCESS: `${prefix}.${name}.SUCCESS`,
    FAILURE: `${prefix}.${name}.FAILURE`,
    RESET: `${prefix}.${name}.RESET`
  }

  const Actions = {
    'REQUEST': (...payload: string[]) => ({
      type: Types.REQUEST,
      payload: paramsForRequest.reduce((res, param, index) => ({...res, [param]: payload[index]}), {})
    }),
    'SUCCESS': (...payload: string[]) => ({
      type: Types.SUCCESS,
      payload: paramsForSuccess.reduce((res, param, index) => ({...res, [param]: payload[index]}), {})
    }),
    'FAILURE': (...payload: string[]) => ({
      type: Types.FAILURE,
      payload: paramsForFailure.reduce((res, param, index) => ({...res, [param]: payload[index]}), {})
    }),
    'RESET': (...payload: string[]) => ({
      type: Types.RESET,
      payload: paramsForReset.reduce((res, param, index) => ({...res, [param]: payload[index]}), {})
    })
  }

  const StatusSelector = () => {
    const getState = (state: any) => state[prefix]
    return createSelector(
      getState,
      state => {
        const isLoading: boolean = state[`isLoading${captialize(name)}`]
        const isLoaded: boolean = state[`isLoaded${captialize(name)}`]
        const errorMessage: string | undefined = state[`${name}ErrorMessage`]
        return { isLoading, isLoaded, errorMessage }
      }
    )
  }

  return { Actions, Types, Name: name, StatusSelector }
}

export const selectorForAction = (action: AsyncAction) => {
  const getState = (state: any) => state[action.Name]
  return createSelector(
    getState,
    ({ isLoading }) => isLoading
  )
}

export const createField = (field: string) => {
  return {
    [`isLoading${captialize(field)}`]: false,
    [`isLoaded${captialize(field)}`]: false,
    [`${field}ErrorMessage`]: '',
  }
}

export const createReducerHandlers = (action: AsyncAction) => {
  const actionName = action.Name
  const key = captialize(actionName)

  return {
    [action.Types.REQUEST]: (state: any) => ({
      ...state,
      [`isLoading${key}`]: true,
      [`isLoaded${key}`]: false,
      [`${actionName}ErrorMessage`]: null
    }),
    [action.Types.FAILURE]: (state: any, action: any) => ({
      ...state,
      [`isLoading${key}`]: false,
      [`isLoaded${key}`]: false,
      [`${actionName}ErrorMessage`]: get(action, 'payload.error.message', '')
    }),
    [action.Types.SUCCESS]: (state: any, action: any) => {
      let nextState = {
        [`isLoading${key}`]: false,
        [`isLoaded${key}`]: true,
        [`${actionName}ErrorMessage`]: null
      }

      const payloadResource = get(action, 'payload', {})
      Object.keys(payloadResource).forEach((key: string) => {
        set(nextState, key, payloadResource[key])
      })

      return {
        ...state,
        ...nextState
      }
    },
    [action.Types.RESET]: (state: any) => ({
      ...state,
      [`isLoading${key}`]: false,
      [`isLoaded${key}`]: false,
      [`${actionName}ErrorMessage`]: null
    })
  }
}

export const mergeFields = (...actions: AsyncAction[]) => actions.reduce((res, action) => ({...res, ...createField(action.Name)}), {})

export const mergeHandlers = (...actions: AsyncAction[]) => actions.reduce((res, action) => ({...res, ...createReducerHandlers(action)}), {})

export const generateFieldsAndHandlers = (...actions: AsyncAction[]) => ({
  initialState: mergeFields(...actions),
  handler: mergeHandlers(...actions)
})

export const createReducer = (initialState: any, handlers: any) => (
  state = initialState,
  action: any,
) => (handlers[action.type] ? handlers[action.type](state, action) : state)

export const createReducerFromActions = (...actions: AsyncAction[]) => {
  const {
    initialState,
    handler
  } = generateFieldsAndHandlers(...actions)

  return createReducer(initialState, handler)
}