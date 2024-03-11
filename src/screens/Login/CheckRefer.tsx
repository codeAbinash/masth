import Images from '@assets/images/images'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import KeyboardAvoidingContainer from '@components/KeyboardAvoidingContainer'
import { PaddingBottom, PaddingTop } from '@components/SafePadding'
import { Dimensions, Image, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'

const { width, height } = Dimensions.get('window')

const IMG_WIDTH = width - 50
const IMG_HEIGHT = (IMG_WIDTH * 749) / 1000

export default function CheckRefer() {
  return (
    <KeyboardAvoidingContainer>
      <View className='flex-1 bg-white'>
        <PaddingTop />
        <View className='h-screen flex-1 justify-between p-5'>
          <Text className='text-center text-2xl font-bold'>Are you Referred?</Text>
          <View style={{ gap: 20 }} className='items-center justify-center'>
            <Image source={Images.referral} style={{ width: IMG_WIDTH, height: IMG_HEIGHT, resizeMode: 'contain', marginBottom: 20 }} />
            <Text className='text-center text-lg'>If you have a referral code, enter it here.</Text>
            <Input placeholder='Enter Refer Code' LeftUI={<Icon name='cross-reference' size={18} color={'gray'} />} />
            <Button title='Apply Refer Code' />
            <Text className='px-5 text-center text-orange-500'>
              If you don't have a referral code, skip this step. But you will not be able to get the benefits of the referral program.
            </Text>
          </View>
          <View />
          <View style={{ gap: 25 }}>
            <Button title='Skip this step' variant='outline' />
          </View>
        </View>
        <PaddingBottom />
      </View>
    </KeyboardAvoidingContainer>
  )
}
