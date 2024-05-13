import { Share } from 'react-native'

export async function shareText(message: string) {
  try {
    const result = await Share.share({ message })
  } catch (error) {}
}

export function removePlusBeforeCountryCode(country_code: string) {
  return country_code.replace('+', '')
}

export function formattedDate(date: Date | null) {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}

export function niceDate(date: Date | null) {
  if (!date) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

import { Alert } from 'react-native'

// Utils
export const p = console.log
export const e = console.error

// each message string will be displayed on a new line
export const showAlert = (title: string, messages?: string[]) => {
  const message = messages?.reduce((acc, s) => (s.length > 0 ? `${acc}\n${s}` : acc))
  Alert.alert(title, message, [{ text: 'OK' }])
}

export const prettyJSON = (obj: any) => JSON.stringify(obj, null, 2)

export function blank_fn() {}
