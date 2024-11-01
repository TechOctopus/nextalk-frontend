import { api } from 'boot/axios'

export type ApiResponse =
  | {
      ok: true
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any
    }
  | {
      ok: false
      error: string
    }

export async function apiRequest(method: 'GET' | 'POST', url: string, data?: object): Promise<ApiResponse> {
  const config = {
    method,
    url,
    ...(data && { data }),
  }

  return await api(config)
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        return {
          ok: true,
          data: res.data,
        } as ApiResponse
      }
      return {
        ok: false,
        error: 'Something went wrong, try again later',
      } as ApiResponse
    })
    .catch((error) => {
      return {
        ok: false,
        error: error.response.data?.message || 'Something went wrong, try again later',
      } as ApiResponse
    })
}

export async function joinChannel(name: string, isPrivate = false) {
  return await apiRequest('POST', '/channel/create', { name, isPrivate })
}

export async function quitChannel(id: string) {
  return await apiRequest('GET', `/channel/${id}/delete`)
}
