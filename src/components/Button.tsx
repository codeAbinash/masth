import React from 'react'
import {Image, ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface ButtonProps extends TouchableOpacityProps {
  title: string
  variant?: 'outline' | 'solid'
  classNames?: string
  icon?: ImageSourcePropType | string
  IconProvider?: typeof Icon
}
export const Button: React.FC<ButtonProps> = ({onPress, title, variant, classNames, icon, IconProvider, ...rest}) => {
  const isOutline = variant === 'outline'
  const iconSize = icon ? 20 : 0
  const iconColor = isOutline ? 'black' : 'white'
  const space = 10
  const bg = isOutline ? 'bg-transparent' : 'bg-black'
  const textColor = isOutline ? 'text-black' : 'text-white'
  const activeOpacity = isOutline ? 0.3 : 0.7

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      className={`flex w-full flex-row items-center justify-center rounded-2xl border-black ${bg} ${classNames}`}
      style={{padding: 15, borderWidth: 1.5}}
      onPress={onPress}
      {...rest}>
      {IconProvider && icon ? (
        <IconProvider
          name={icon as string}
          size={iconSize}
          color={iconColor}
          style={{
            marginRight: space,
          }}
        />
      ) : (
        icon && (
          <Image style={{width: iconSize, height: iconSize, marginRight: space}} source={icon as ImageSourcePropType} />
        )
      )}

      <Text className={textColor} style={{fontSize: 17, marginRight: (10 + iconSize) / 2}}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}
