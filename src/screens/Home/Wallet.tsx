import icons from '@assets/icons/icons'
import { Button, SmallButton } from '@components/Button'
import { Input } from '@components/Input'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import { PaddingTop } from '@components/SafePadding'
import SmallProfile, { RightSideSmallProfile } from '@components/SmallProfile'
import Tabs from '@components/Tabs'
import LockIcon from '@icons/lock.svg'
import SwapIcon from '@icons/swap.svg'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import React, { useState } from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type RadioButtonOption = {
  key: string
  text: string
}
interface RadioButtonProps extends ViewProps {
  options: RadioButtonOption[]
  value: string
  onChange: (value: string) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ options, value, onChange, style }) => {
  return (
    <View className='flex-row flex-wrap items-center gap-3' style={style}>
      {options.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            className={`items-center justify-center rounded-2xl border-neutral-300 p-2 px-5 ${
              value === item.key ? 'border-yellowPrimary bg-yellowPrimary' : ''
            }`}
            onPress={() => onChange(item.key)}
            style={{ borderWidth: 1.5 }}
          >
            <Text className='text-black' style={{ fontSize: 17 }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const options: RadioButtonOption[] = [
  { key: '200', text: '200 MST' },
  { key: '500', text: '500 MST' },
  { key: '1500', text: '1500 MST' },
]

function LeftUI() {
  const [selected, setSelected] = useState<string>(options[2].key)
  return (
    <View style={{ gap: 15, marginTop: 15 }}>
      <RadioButton options={options} value={selected} onChange={setSelected} style={{ marginTop: 0 }} />
      <View className='gap-1'>
        <Text className='pl-1.5'>Amount</Text>
        <Input placeholder='Enter amount' keyboardType='numeric' style={{ backgroundColor: 'white' }} />
      </View>
      <View className='gap-1'>
        <Text className='pl-1.5'>Wallet Address</Text>
        <Input placeholder='Wallet Address' keyboardType='numeric' style={{ backgroundColor: 'white' }} />
      </View>
      <Button title='Send Now' className='mt-2.5' />
    </View>
  )
}

const { width } = Dimensions.get('window')

function RightUI() {
  return (
    <View>
      <View className='mt-5 flex items-center justify-center rounded-2xl bg-white p-4'>
        <QRCode
          value='https://www.example.com/dfsdf/sdfsdf/sdfsdf/sdfsdf/sdfsdfs/sdfsdf/sdfsdf/sdfsdf/sdfsdf/sdfsdf/sdfsdf/sdfsdf/'
          size={width - 70}
          backgroundColor='white'
          color='black'
          // logo={{ uri: 'https://picsum.photos/100' }}
          logo={icons.appIcon}
          // linearGradient={['#2aa3ce', '#416eec']}
          linearGradient={['dodgerblue', '#00b3b3']}
          // gradientDirection={}
          logoBackgroundColor='transparent'
          enableLinearGradient={true}
          logoBorderRadius={20}
        />
        <View className='mt-5 flex-row items-center justify-center gap-x-2 rounded-full'>
          <Icon name='shield-check' size={18} color={colors.green} />
          <Text className='text-lg text-green-500'>Trust Wallet</Text>
        </View>
      </View>
    </View>
  )
}

export default function Wallet({ navigation }: { navigation: StackNav }) {
  return (
    <KeyboardAvoidingContainer style={{ backgroundColor: colors.bgSecondary }}>
      <ScrollView className='p-5'>
        <PaddingTop />
        <SmallProfile RightSide={<RightSideSmallProfile navigation={navigation} />} />
        <View className='mt-3 flex-row items-center justify-between'>
          <View className='flex flex-row'>
            <Text className='text-neutral-500' style={{ fontSize: 30 }}>
              Your,{' '}
            </Text>
            <Text style={{ fontSize: 30 }}>Wallet</Text>
          </View>
          <TouchableOpacity
            className='rounded-full border border-neutral-200 bg-white p-2.5'
            onPress={() => navigation.navigate('Transactions')}
          >
            <SwapIcon height={18} width={18} />
          </TouchableOpacity>
        </View>
        <View>
          <WalletBalance />
        </View>
        <Tabs
          tabs={[
            { title: 'Send', UI: <LeftUI /> },
            { title: 'Receive', UI: <RightUI /> },
          ]}
        />
      </ScrollView>
    </KeyboardAvoidingContainer>
  )
}

function WalletBalance() {
  return (
    <View className='mt-4 rounded-3xl bg-yellowPrimary p-5'>
      <Text className='text-lg text-onYellow'>Wallet Balance</Text>
      <View className='mt-3 flex-row items-end'>
        <Text className='text-5xl text-onYellow'>{(6860.306).toLocaleString()}</Text>
        <Text className='mb-1.5 ml-1 text-2xl text-onYellow'>MST</Text>
      </View>
      <View className='mt-3 flex-row items-center justify-between' style={{ gap: 15 }}>
        <View style={{ flex: 0.5 }}>
          <SmallButton title='Withdraw' SvgIcon={LockIcon} />
        </View>
        <Text style={{ flex: 0.5, fontSize: 17 }} className='text-onYellow'>
          MST/USD 0.99
        </Text>
      </View>
    </View>
  )
}
