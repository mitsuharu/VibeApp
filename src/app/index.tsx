import { styleType } from '@mitsuharu/react-native-components-plus'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  type TextStyle,
  useColorScheme,
  View,
  type ViewStyle,
} from 'react-native'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/constants/Colors'

type Props = {
  text: String
}

type ComponentProps = Props & {
  text: String
}

const Component: React.FC<ComponentProps> = ({
  text
}) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const [text, setText] = useState<string>('hello world')

  return (
    <Component
      {...props}
      {...{
        text
      }}
    />
  )
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => {
  const styles = StyleSheet.create({
    container: styleType<ViewStyle>({
      flex: 1,
      padding: 16,
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
    }),
    text: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 16,
    }),
  })
  return styles
})

export default Container
