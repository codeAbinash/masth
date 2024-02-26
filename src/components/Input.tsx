import {Image, ImageSourcePropType, TextInput, TextInputProps, View} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

interface InputProps extends TextInputProps {
  className?: string
  icon?: ImageSourcePropType | string
  IconProvider?: typeof Icon
}

export const Input: React.FC<InputProps> = ({
  onTextInput,
  icon,
  IconProvider,
  placeholder = 'Sample Placeholder',
  className,
  ...rest
}) => {
  const iconSize = icon ? 20 : 0
  return (
    <View
      className={`flex flex-row items-center justify-center rounded-2xl border-neutral-300 bg-neutral-100 ${className}`}
      style={{borderWidth: 1.5, paddingVertical: 2, paddingLeft: 15, paddingRight: 10}}>
      {IconProvider && icon ? (
        <IconProvider
          name={icon as string}
          size={20}
          color='black'
          style={{
            marginRight: 10,
          }}
        />
      ) : (
        icon && (
          <Image style={{width: iconSize, height: iconSize, marginRight: 10}} source={icon as ImageSourcePropType} />
        )
      )}
      <TextInput
        placeholder={placeholder}
        className='flex-1 border-none border-transparent text-lg outline-none'
        onTextInput={onTextInput}
        {...rest}
      />
    </View>
  )
}
