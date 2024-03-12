import { Share } from 'react-native'

export async function shareText(message: string) {
  try {
    const result = await Share.share({ message })
  } catch (error) {}
}

export function removePlusBeforeCountryCode(country_code: string) {
  return country_code.replace('+', '')
}

export function formattedDate(date: Date) {
  return date.toISOString().split('T')[0]
}
