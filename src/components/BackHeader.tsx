import BackIcon from '@icons/arrow-left.svg'
import SettingIcon from '@icons/setting.svg'
import {StackNav} from '@utils/types'
import React from 'react'
import {Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {PaddingTop} from './SafePadding'

export default function BackHeader({
  navigation,
  title,
  RightComponent,
}: {
  navigation: StackNav
  title: string
  RightComponent?: React.ReactNode
}) {
  return (
    <>
      <PaddingTop />
      <View className='flex-row items-center justify-between p-2 px-3 pr-4'>
        <View className='flex-row items-center gap-3'>
          <TouchableOpacity className='p-2.5' onPress={() => navigation.goBack()}>
            <BackIcon height={20} width={20} />
          </TouchableOpacity>
          <Text className='font-medium' style={{fontSize: 21}}>
            {title}
          </Text>
        </View>
        {RightComponent ? RightComponent : null}
      </View>
    </>
  )
}

export function RightSettingIcon({navigation}: {navigation: StackNav}) {
  return (
    <TouchableOpacity className='p-2' onPress={() => navigation.navigate('Settings')}>
      <SettingIcon height={22} width={22} />
    </TouchableOpacity>
  )
}
