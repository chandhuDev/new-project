import { API_URL } from './config'

export const apiRequest = async <T = void>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const res = await fetch(API_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw data
  }
  return data
}
