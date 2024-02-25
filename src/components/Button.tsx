import React from 'react'
import {Image, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'outline' | 'solid'
  classNames?: string
  icon?: string
  IconProvider?: typeof Icon
}
export const Button: React.FC<ButtonProps> = ({onPress, title, variant, classNames, icon, IconProvider, ...rest}) => {
  const isOutline = variant === 'outline'
  const iconSize = icon ? 20 : 0
  const iconColor = isOutline ? 'black' : 'white'
  const space = 10
  const bg = isOutline ? 'bg-transparent' : 'bg-black'
  const textColor = isOutline ? 'text-black' : 'text-white'

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex w-full flex-row items-center justify-center rounded-2xl border-2 border-black ${bg} ${classNames}`}
      style={{padding: 15}}
      onPress={onPress}
      {...rest}>
      {IconProvider && icon ? (
        <IconProvider
          name='share-2'
          size={iconSize}
          color={iconColor}
          style={{
            marginRight: space,
          }}
        />
      ) : (
        <Image
          style={{width: iconSize, height: iconSize, marginRight: space}}
          source={require('../assets/icons/src/appIcon.png')}
        />
      )}

      <Text className={textColor} style={{fontSize: 17, marginRight: (10 + iconSize) / 2}}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
