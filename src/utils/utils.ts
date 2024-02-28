import { Share } from 'react-native'

export async function shareText(message: string) {
  try {
    const result = await Share.share({ message })
  } catch (error) {}
}
