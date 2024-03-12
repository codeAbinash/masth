import icons from '@assets/icons/icons'
import BottomSheet, { BottomSheetRefProps } from '@components/BottomSheet'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { SmallLoadingWrapped } from '@components/Loading'
import { Select } from '@components/Select'
import { signUpApi_f } from '@query/api'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useMutation } from '@tanstack/react-query'
import { StackNav } from '@utils/types'
import { formattedDate, removePlusBeforeCountryCode } from '@utils/utils'
import React from 'react'
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import IconM from 'react-native-vector-icons/MaterialIcons'
import CountryCodeSelector from './CountryCodeSelector'
import { isValidFullName, isValidPhoneNumber, isValidUserName } from './utils'

const appIconSize = 0.45

const { width } = Dimensions.get('window')

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

export default function SignUp({ navigation }: { navigation: StackNav }) {
  const sheet = React.useRef<BottomSheetRefProps>(null)
  const languageSheet = React.useRef<BottomSheetRefProps>(null)
  const [country_code, setCountry_code] = React.useState('+91')
  const [lang, setLang] = React.useState(LANGUAGES[0].name)
  const [dob, setDob] = React.useState<Date | ''>(new Date(''))
  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [phone, setPhone] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [name, setName] = React.useState('')

  const signUpMutation = useMutation({
    mutationFn: () =>
      signUpApi_f({ username, country_code: removePlusBeforeCountryCode(country_code), dob: formattedDate(dob as Date), lang, name, phone }),
    onSuccess: (data) => {
      navigation.replace('OTP', { phone, country_code, isSignUp: true })
    },
  })

  function handelSubmit() {
    const usernameStatus = isValidUserName(username.trim())
    if (!usernameStatus.status) {
      return Alert.alert('Invalid Username', usernameStatus.message)
    }
    const fullNameStatus = isValidFullName(name.trim())
    if (!fullNameStatus.status) {
      return Alert.alert('Invalid Full Name', fullNameStatus.message)
    }
    if (!country_code) {
      return Alert.alert('Country Code Required', 'Please select your country code.')
    }
    const phoneNumberStatus = isValidPhoneNumber(phone.trim())
    if (!phoneNumberStatus.status) {
      return Alert.alert('Invalid Phone Number', phoneNumberStatus.message)
    }
    if (!dob) {
      return Alert.alert('Date of Birth Required', 'Please select your date of birth.')
    }

    if (!lang) {
      return Alert.alert('Language Required', 'Please select your language.')
    }

    signUpMutation.mutate()
  }

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
              <Input placeholder='Username' LeftUI={<Icon name='at' size={20} color='black' />} onChangeText={setUsername} value={username} />
              <Input placeholder='Full Name' LeftUI={<Icon name='account-outline' size={20} color='black' />} onChangeText={setName} value={name} />
              <View className='flex flex-row items-center justify-center' style={{ gap: 10 }}>
                <Select
                  placeholder='+ CC'
                  LeftUI={<Icon name='phone-outline' size={20} color='black' />}
                  style={{ flex: 0.45 }}
                  onPress={() => {
                    sheet.current?.openFull()
                  }}
                  RightUI={null}
                  value={country_code}
                />
                <Input placeholder='Mobile Number' keyboardType='phone-pad' className='flex-1' onChangeText={setPhone} value={phone} />
              </View>
              <Select
                placeholder='Date of Birth'
                space={15}
                LeftUI={<Icon name='calendar-month-outline' size={20} color='black' />}
                RightUI={null}
                onPress={() => {
                  setShowDatePicker(true)
                }}
                value={dob && formattedDate(dob as Date)}
              />
              <Select
                placeholder='Language'
                space={15}
                LeftUI={<IconM name='language' size={20} color='black' />}
                onPress={() => {
                  languageSheet.current?.open()
                }}
                value={lang}
              />
              <View className='h-4' />
              {signUpMutation.isPending ? (
                <Button title='Sending OTP...' LeftUI={<SmallLoadingWrapped />} disabled={true} />
              ) : (
                <Button title='Create Account' onPress={handelSubmit} LeftUI={<Icon name='creation' size={17} color='white' />} />
              )}
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
          setCountryCode={setCountry_code}
          closeFn={() => {
            sheet.current?.close()
          }}
        />
      </BottomSheet>
      <BottomSheet ref={languageSheet}>
        <LanguageSelector
          setLanguage={setLang}
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
              setDob(selectDate || dob)
            }
          }}
          value={dob || new Date()}
        />
      )}
    </>
  )
}

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
                closeFn()
                setTimeout(() => setLanguage(language.name))
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
