import icons from '@assets/icons/icons'
import BottomSheet, { BottomSheetRefProps } from '@components/BottomSheet'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Select } from '@components/Select'
import { countries as ALL_COUNTRIES } from '@utils/countryCode'
import { StackNav } from '@utils/types'
import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type Country = {
  name: string
  flag: string
  dial_code: string
}

const { width } = Dimensions.get('window')

const appIconSize = 0.5

export default function Login({ navigation }: { navigation: StackNav }) {
  const sheet = React.useRef<BottomSheetRefProps>(null)
  const [countryCode, setCountryCode] = React.useState('+91')

  return (
    <>
      <View className='flex h-full flex-1 justify-between bg-white p-4 pb-2'>
        <PaddingTop />
        <View />
        <View>
          <View className='flex items-center justify-center'>
            <Image source={icons.appIcon} style={{ width: width * appIconSize * 1.37, height: width * appIconSize }} />
            <Text className='text-center font-mono text-4xl font-bold text-black'>Welcome</Text>
            <Text className='p-4 px-10 pt-1 text-center text-lg text-neutral-500' style={{ lineHeight: 25 }}>
              There are many variations of passages of Lorem Ipsum available
            </Text>
          </View>
          <View style={{ gap: 10, marginTop: 10 }}>
            <View className='flex flex-row items-center justify-center' style={{ gap: 10 }}>
              <Select
                placeholder='+xx'
                LeftUI={<Icon name='phone-outline' size={20} color='black' />}
                style={{ flex: 0.45 }}
                onPress={() => {
                  sheet.current?.openFull()
                }}
                RightUI={null}
                value={countryCode}
              />
              <Input placeholder='Mobile Number' keyboardType='number-pad' className='flex-1' />
            </View>
            <View className='mt-3' />
            <Button title='Log In' onPress={() => navigation.navigate('OTP')} LeftUI={<Icon name='account' size={17} color='white' />} />
            <Button
              title='Create Account'
              variant='outline'
              LeftUI={<Icon name='creation' size={17} />}
              className='mt-1'
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
        <View />
        <View />
        <View />
        <View>
          <Text className='text-center text-gray-600'>By continuing you are accepting our Terms and Conditions</Text>
          <PaddingBottom />
        </View>
      </View>
      <BottomSheet ref={sheet}>
        <CountryCodeSelector
          setCountryCode={setCountryCode}
          closeFn={() => {
            sheet.current?.close()
          }}
        />
      </BottomSheet>
    </>
  )
}

function searchFn(search: string) {
  search = search.trim()
  return ALL_COUNTRIES.filter((country) => country.name.toLowerCase().includes(search.toLowerCase()) || country.dial_code.includes(search))
}

function CountryCodeSelector({ setCountryCode, closeFn }: { setCountryCode: React.Dispatch<React.SetStateAction<string>>; closeFn: () => void }) {
  const [search, setSearch] = React.useState('')
  const [countries, setCountries] = React.useState<Country[]>([])

  React.useEffect(() => {
    if (search.trim() === '') {
      return setCountries(ALL_COUNTRIES)
    }
    const timer = setTimeout(() => {
      setCountries(searchFn(search))
    }, 300)
    return () => {
      clearTimeout(timer)
    }
  }, [search])

  return (
    <View>
      <View className='px-4 pb-4'>
        <Input placeholder='Select Your country' LeftUI={<Icon name='magnify' size={20} color='gray' />} onChangeText={setSearch} />
      </View>
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View className='pb-16'>
          {countries.length === 0 && <Text className='text-center text-gray-500'>No results found</Text>}
          {countries.map((country, index) => (
            <TouchableOpacity
              key={index}
              className='flex flex-row items-center gap-3.5 p-2.5'
              style={{ gap: 10 }}
              onPress={() => {
                setCountryCode(country.dial_code)
                closeFn()
              }}
            >
              <Text className='text-2xl'>{country.flag}</Text>
              <Text style={{ fontSize: 17, fontWeight: '500' }}>{country.dial_code}</Text>
              <Text style={{ fontSize: 17, flex: 1, fontWeight: '500' }} numberOfLines={1}>
                {country.name}
              </Text>
            </TouchableOpacity>
          ))}
          <PaddingBottom />
        </View>
      </ScrollView>
    </View>
  )
}
