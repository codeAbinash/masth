import React from 'react'
import {TouchableOpacity, Image, ImageSourcePropType, View, Text, TouchableOpacityProps} from 'react-native'
import IconM from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface SelectProps extends TouchableOpacityProps {
  disabled?: boolean
  title: string
  classNames?: string
  icon?: ImageSourcePropType | string
  space?: number
  IconProvider?: typeof Icon
}

export const Select: React.FC<SelectProps> = ({
  onPress,
  style,
  title,
  classNames,
  icon,
  IconProvider,
  space = 5,
  ...rest
}) => {
  const iconSize = icon ? 20 : 0
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      className={`flex w-full flex-row rounded-2xl border-neutral-300 bg-neutral-100 ${classNames}`}
      style={[{padding: 15, borderWidth: 1.5}, style]}
      onPress={onPress}
      {...rest}>
      {IconProvider && icon ? (
        <IconProvider
          name={icon as string}
          size={20}
          color='black'
          style={{
            marginRight: space,
          }}
        />
      ) : (
        icon && (
          <Image style={{width: iconSize, height: iconSize, marginRight: 5}} source={icon as ImageSourcePropType} />
        )
      )}
      <View className='flex flex-1 flex-row justify-between'>
        <Text className={'text-gray-500'} style={{fontSize: 17}}>
          {title}
        </Text>
        <IconM
          name='keyboard-control-key'
          size={20}
          color='black'
          style={{backgroundColor: 'transparent', transform: [{rotate: '180deg'}]}}
        />
      </View>
    </TouchableOpacity>
  )
}
