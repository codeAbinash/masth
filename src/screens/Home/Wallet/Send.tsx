import icons from '@assets/icons/icons'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import Label from '@components/Label'
import RadioButton, { RadioButtonOption } from '@components/Radio'
import { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const options: RadioButtonOption[] = [
  { key: '200', text: '200 MST' },
  { key: '500', text: '500 MST' },
  { key: '1500', text: '1500 MST' },
]

function Currency() {
  return <Text className='mr-1.5 text-base'>MST</Text>
}

function QRCodeIcon() {
  return (
    <TouchableOpacity>
      {/* <Icon name='qrcode-scan' size={20} color='black' style={{ marginRight: 10 }} /> */}
      <Image source={icons.qr} style={{ marginRight: 5, width: 22, height: 22, tintColor: 'black' }} />
    </TouchableOpacity>
  )
}

export default function Send() {
  const [selected, setSelected] = useState<string>(options[2].key)
  return (
    <View style={{ gap: 15, marginTop: 15 }}>
      <RadioButton options={options} value={selected} onChange={setSelected} style={{ marginTop: 0 }} />
      <View>
        <Label title='Amount' />
        <Input
          placeholder='Enter amount in MST'
          keyboardType='numeric'
          style={{ backgroundColor: 'white' }}
          RightUI={Currency}
        />
      </View>
      <View>
        <Label title='Receiver Address' />
        <Input placeholder='Enter Receiver Wallet Address' style={{ backgroundColor: 'white' }} RightUI={QRCodeIcon} />
      </View>
      <Button title='Send Now' className='mt-2.5' />
    </View>
  )
}
