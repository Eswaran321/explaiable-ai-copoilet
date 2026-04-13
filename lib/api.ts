import useSWR from 'swr'
import { ApiResponse } from './types'

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'API Error')
  }
  return res.json()
}

export function useApi<T>(url: string | null) {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<T>>(url, fetcher)

  return {
    data: data?.data,
    isLoading,
    isError: !!error,
    error: error?.message,
    mutate
  }
}

export async function callApi<T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'POST',
  body?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (body) {
      options.body = JSON.stringify(body)
    }

    const response = await fetch(endpoint, options)
    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'An error occurred'
      }
    }

    return {
      success: true,
      data: data.data || data,
      message: data.message
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
