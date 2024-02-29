import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { StackNav } from '@utils/types'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import icons from '@assets/icons/icons'
import { Button } from '@components/Button'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { colors } from '@utils/colors'

const { width } = Dimensions.get('window')
const appIconSize = 0.35
// import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'

export default function OTP({ navigation }: { navigation: StackNav }) {
  return (
    // <KeyboardAvoidingContainer>
    <View className='flex-1 justify-between bg-white'>
      <View>
        <PaddingTop />
      </View>
      <View className='items-center'>
        <Image source={icons.mobile_otp} style={{ width: width * appIconSize, height: width * appIconSize }} />
        <Text className='mt-5 text-center text-3xl font-bold'>Verify OTP</Text>
        <Text className='mt-4 w-4/5 text-center text-base text-neutral-600'>
          We have sent an otp to your mobile number ends with 8988
        </Text>
        <View style={{ padding: 5 }}>
          <View className='flex-row'>
            <OTPInputView
              style={{ height: 100, width: 300, flex: 1, paddingHorizontal: 20 }}
              pinCount={6}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`)
              }}
            />
          </View>
          <View className='flex-row' style={{ paddingHorizontal: 20 }}>
            <Button title='Confirm' onPress={() => navigation.navigate('Home')} />
          </View>
          <View className='mt-8 flex-row items-center justify-center px-5'>
            <Text className='text-center text-base text-neutral-700'>Didn't receive OTP?</Text>
            <TouchableOpacity>
              <Text className='text-center text-base font-bold'> Resend OTP</Text>
            </TouchableOpacity>
            <Text className='text-center text-base text-neutral-700'> in 00:30</Text>
          </View>
        </View>
      </View>
      <View className='px-5 pb-2'>
        <Text className='text-center text-neutral-600'>By continuing you are accepting our Terms and Conditions</Text>
        <PaddingBottom />
      </View>
    </View>
    // </KeyboardAvoidingContainer>
  )
}

const styles = StyleSheet.create({
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    color: 'black',
    fontSize: 20,
    borderWidth: 1.5,
    borderRadius: 14,
    backgroundColor: colors.bgSecondary,
    height: (width - 100) / 6 + 5,
    width: (width - 100) / 6,
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
})
