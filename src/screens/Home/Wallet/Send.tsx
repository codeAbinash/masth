import { Button } from '@components/Button'
import { Input } from '@components/Input'
import RadioButton, { RadioButtonOption } from '@components/Radio'
import { useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const options: RadioButtonOption[] = [
  { key: '200', text: '200 MST' },
  { key: '500', text: '500 MST' },
  { key: '1500', text: '1500 MST' },
]
export default function Send() {
  const [selected, setSelected] = useState<string>(options[2].key)
  return (
    <View style={{ gap: 15, marginTop: 15 }}>
      <RadioButton options={options} value={selected} onChange={setSelected} style={{ marginTop: 0 }} />
      <View className='gap-1'>
        <Text className='pl-1.5'>Amount</Text>
        <Input
          placeholder='Enter amount in MST'
          keyboardType='numeric'
          style={{ backgroundColor: 'white' }}
          RightUI={() => {
            return <Text className='mr-1.5 text-lg'>MST</Text>
          }}
        />
      </View>
      <View className='gap-1'>
        <Text className='pl-1.5'>Wallet Address</Text>
        <Input
          placeholder='Enter Receiver Wallet Address'
          style={{ backgroundColor: 'white' }}
          RightUI={() => {
            return (
              <TouchableOpacity>
                <Icon name='qrcode-scan' size={20} color='black' style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <Button title='Send Now' className='mt-2.5' />
    </View>
  )
}
