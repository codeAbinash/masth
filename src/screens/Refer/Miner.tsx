import BellWhiteIcon from '@icons/bell-white.svg'
import { lastActiveDays } from '@utils/utils'
import React from 'react'
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native'

interface MinerProps {
  name: string
  username: string
  profile_pic: string
  bellIcon?: boolean
  phone?: string
  country_code?: string
  lastActive?: Date
}

const Miner: React.FC<MinerProps> = ({ name, username, profile_pic, bellIcon, phone, lastActive }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className='flex-row  items-center justify-between bg-white p-3'
      style={{
        borderRadius: 20,
      }}
    >
      <View className='flex-row items-center gap-3' style={{ flex: 1 }}>
        <Image source={{ uri: profile_pic }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        <View style={{ flex: 1 }}>
          <Text className='text-base' numberOfLines={1}>
            {name}
          </Text>
          <Text className='text-base text-neutral-600' style={{ fontSize: 16 }} numberOfLines={1}>
            {lastActive ? `Inactive for ${lastActiveDays(lastActive)} days` : `@${username}`}
          </Text>
        </View>
        {bellIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            // Send message to the user whatsapp

            onPress={() => {
              const link = getWhatsAppLink(phone, name)
              console.log(link)
              Linking.openURL(link)
            }}
          >
            <View className='items-center justify-center rounded-full bg-black' style={{ width: 43, height: 43 }}>
              <BellWhiteIcon height={17} width={17} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  )
}

function getWhatsAppLink(phone: string | undefined, name: string) {
  return `https://wa.me/${phone}?text=Hi%20${name}, You are inactive for a long time. Can you please check your Masth Miner app and start mining again to earn more MST!`
}

export default Miner
