import {colors} from '@utils/colors'
import {View, Text} from 'react-native'

export default function Home() {
  return (
    <View style={{backgroundColor: colors.bgSecondary, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
    </View>
  )
}
