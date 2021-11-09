
import qs from 'qs'
import { APIConstants } from 'shared/constants'

export const apiCall = async (url: string, method: 'get' | 'post' | 'put' | 'delete' = 'get', params: any = null) => {
  const query = method === 'post' ||
    method === 'put' ||
    method === 'delete' 
    ? JSON.stringify(params)
    : qs.stringify(params, { arrayFormat: 'brackets' })

  const fullUrl = method === 'post' ||
    method === 'put' ||
    method === 'delete' ||
    !query
    ? `${APIConstants.base}${url}`
    : `${APIConstants.base}${url}?${query}`

  const options = method === 'post' ||
    method === 'put' ||
    method === 'delete'
    ? {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: query
    }
    : undefined

  try {
    const response = await fetch(fullUrl, options).then(res => res.json())
    if (response.code > 300) {
      throw response
    } else {
      return response
    }
  } catch (error) {
    throw error
  }
  
}