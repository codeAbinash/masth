import icons from '@assets/icons/icons'
import BottomSheet, { BottomSheetRefProps } from '@components/BottomSheet'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { StackNav } from '@utils/types'
import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconM from 'react-native-vector-icons/MaterialIcons'
import CountryCodeSelector from './CountryCodeSelector'
import DateTimePicker from '@react-native-community/datetimepicker'

const appIconSize = 0.45

const { width } = Dimensions.get('window')

export default function SignUp({ navigation }: { navigation: StackNav }) {
  const sheet = React.useRef<BottomSheetRefProps>(null)
  const languageSheet = React.useRef<BottomSheetRefProps>(null)
  const [countryCode, setCountryCode] = React.useState('')
  const [language, setLanguage] = React.useState('')
  const [date, setDate] = React.useState<Date | ''>('')
  const [showDatePicker, setShowDatePicker] = React.useState(false)

  return (
    <>
      <ScrollView className='bg-white'>
        <View className='flex h-full flex-1 justify-between bg-white p-4 pb-2'>
          <View>
            <View className='mt-2 flex items-center justify-center'>
              <Image source={icons.appIcon} style={{ width: width * appIconSize * 1.37, height: width * appIconSize }} />
              <Text className='text-center font-mono text-3xl font-bold text-black'>Let's Sign Up</Text>
              <Text className='p-4 px-10 pt-1 text-center text-lg text-neutral-500' style={{ lineHeight: 25 }}>
                There are many variations of passages of Lorem Ipsum available
              </Text>
            </View>
            <View style={{ gap: 10, marginTop: 10 }}>
              <Input placeholder='Username' LeftUI={<Icon name='at' size={20} color='black' />} />
              <Input placeholder='Full Name' LeftUI={<Icon name='account-outline' size={20} color='black' />} />
              <View className='flex flex-row items-center justify-center' style={{ gap: 10 }}>
                <Select
                  placeholder='+ CC'
                  LeftUI={<Icon name='phone-outline' size={20} color='black' />}
                  style={{ flex: 0.45 }}
                  onPress={() => {
                    sheet.current?.openFull()
                  }}
                  RightUI={null}
                  value={countryCode}
                />
                <Input placeholder='Mobile Number' keyboardType='phone-pad' className='flex-1' />
              </View>
              <Select
                placeholder='Date of Birth'
                space={15}
                LeftUI={<Icon name='calendar-month-outline' size={20} color='black' />}
                RightUI={null}
                onPress={() => {
                  setShowDatePicker(true)
                }}
                value={date && date.toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric' })}
              />
              <Select
                placeholder='Language'
                space={15}
                LeftUI={<IconM name='language' size={20} color='black' />}
                onPress={() => {
                  languageSheet.current?.open()
                }}
                value={language}
              />
              <Button
                title='Create Account'
                onPress={() => {
                  navigation.replace('Home')
                }}
                LeftUI={<Icon name='creation' size={17} color='white' />}
                className='mt-4'
              />
              <Button
                title='Log In'
                variant='outline'
                className='mt-1'
                onPress={() => navigation.navigate('Login')}
                LeftUI={<Icon name='account' size={17} />}
              />
            </View>
          </View>
          <Text className='mt-2 text-center text-gray-600'>By continuing you are accepting our Terms and Conditions</Text>
        </View>
      </ScrollView>
      <BottomSheet ref={sheet}>
        <CountryCodeSelector
          setCountryCode={setCountryCode}
          closeFn={() => {
            sheet.current?.close()
          }}
        />
      </BottomSheet>
      <BottomSheet ref={languageSheet}>
        <LanguageSelector
          setLanguage={setLanguage}
          closeFn={() => {
            languageSheet.current?.close()
          }}
        />
      </BottomSheet>
      {showDatePicker && (
        <DateTimePicker
          mode='date'
          display='default'
          onChange={({ type }, selectDate) => {
            setShowDatePicker(false)
            if (type === 'set') {
              setDate(selectDate || date)
            }
          }}
          value={date || new Date()}
        />
      )}
    </>
  )
}

const LANGUAGES = [
  { id: 1, name: 'English (UK)' },
  { id: 2, name: 'Hindi' },
  { id: 3, name: 'Indonesian' },
  { id: 4, name: 'Urdu' },
  { id: 5, name: 'German' },
  { id: 6, name: 'Russian' },
]

const LANGUAGES_UPCOMING = [
  { id: 7, name: 'Arabic' },
  { id: 8, name: 'Turki' },
  { id: 9, name: 'African' },
  { id: 10, name: 'Australian' },
]

function LanguageSelector({ setLanguage, closeFn }: { setLanguage: React.Dispatch<React.SetStateAction<string>>; closeFn: () => void }) {
  return (
    <View>
      <Text className='pb-2 pt-0 text-center text-xl font-bold'>Select Language</Text>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <View className='pb-20'>
          {LANGUAGES.map((language, index) => (
            <TouchableOpacity
              key={index}
              className='flex flex-row items-center gap-3.5 p-2.5'
              style={{ gap: 10 }}
              onPress={() => {
                setLanguage(language.name)
                closeFn()
              }}
            >
              <Text style={{ fontSize: 18, flex: 1, fontWeight: '500' }} numberOfLines={1}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
          <View className='pb-2 pt-4'>
            <Text className='mt-3 text-lg text-gray-500'>Upcoming Languages</Text>
          </View>
          {LANGUAGES_UPCOMING.map((language, index) => (
            <TouchableOpacity key={index} className='flex flex-row items-center gap-3.5 p-2.5 opacity-50' style={{ gap: 10 }}>
              <Text style={{ fontSize: 18, flex: 1, fontWeight: '500' }} numberOfLines={1}>
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

/*And The Language Is

1 - English (UK)
2 - Hindi
3 - Indonesian
4 - Urdu
5 - German
6 - Russian

Upcoming

7 - Arabic
8 - Turki
9 - African
10 - Australian*/
