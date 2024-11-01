import { AxiosError } from 'axios'

export function getError(error: AxiosError): string {
  return error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
    ? ((error.response.data as { message: string }).message as string)
    : 'Something went wrong, try again later'
}

export function humanDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(window.navigator.language, { hour: '2-digit', minute: '2-digit' })
}
