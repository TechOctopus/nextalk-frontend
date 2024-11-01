import { AxiosError } from 'axios'

export function getError(error: AxiosError): string {
  return error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data
    ? ((error.response.data as { message: string }).message as string)
    : 'Something went wrong, try again later'
}
