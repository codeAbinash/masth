import { SmallButton } from '@components/Button'
import QR_CODE from '@components/QRCode'
import { PaddingTop } from '@components/SafePadding'
import { colors } from '@utils/colors'
import { StackNav } from '@utils/types'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Profile({ navigation }: { navigation: StackNav }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bgSecondary, flex: 1 }}>
      <PaddingTop />
      <View className='mt-10 items-center'>
        <Text className='text-center text-2xl font-bold text-neutral-800'>Hi There, Abinash</Text>
        <Text className='mt-1 w-2/3 text-center text-sm text-neutral-600'>This is your profile</Text>
      </View>
      <View className='mt-10'>
        <View className='absolute z-10 w-full items-center'>
          <Image
            className='rounded-full bg-neutral-200'
            source={{ uri: 'https://picsum.photos/201' }}
            style={{
              width: 90,
              height: 90,
            }}
          />
          <Text className='pt-1 text-xl font-bold uppercase' style={{ color: '#2aa3ce' }}>
            @codeAbinash
          </Text>
        </View>
        <View className='relative mt-10'>
          <View className='items-center'>
            <View className='items-center rounded-2xl bg-white p-5'>
              <QR_CODE str='codeAbinashKarmakar@Masth@codeAbinash' scale={0.85} style={{ marginTop: 70 }} />
            </View>
          </View>
        </View>
      </View>
      <View className='mt-2 flex-row items-center justify-center p-5' style={{ gap: 10 }}>
        <SmallButton
          title='Edit Profile'
          IconProvider={Icon}
          icon={'edit'}
          className='px-5 py-2.5 pl-4'
          onPress={() => navigation.navigate('EditProfile')}
        />
        <SmallButton title='Sign Out' IconProvider={FeatherIcon} icon={'log-out'} className='px-5 py-2.5' />
      </View>
    </ScrollView>
  )
}
