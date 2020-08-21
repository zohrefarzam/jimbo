import {Platform, StyleSheet} from 'react-native';
import styles from '../../../config/styles';
import normalize from 'react-native-normalize';
const isIOS = Platform.OS === 'ios';

export default StyleSheet.create({
  defaultStyles: {
    fontFamily: 'IRANSansMobile',
    ...Platform.select({
      ios: {
        textAlign: 'right',
      },
    }),
  },
  hiddenTrick: {
    color: 'transparent',
    fontSize: 0,
  },
  regular: {
    fontFamily: 'IRANSansMobile',
  },
  light: {
    fontFamily: isIOS ? 'IRANSansMobile-Light' : 'IRANSansMobile_Light',
  },
  bold: {
    fontFamily: isIOS ? 'IRANSansMobile-Bold' : 'IRANSansMobile_Bold',
  },
  medium: {
    fontFamily: isIOS ? 'IRANSansMobile-Medium' : 'IRANSansMobile_Medium',
  },
  ultraLight: {
    fontFamily: isIOS
      ? 'IRANSansMobile-UltraLight'
      : 'IRANSansMobile_UltraLight',
  },
  s: {
    fontSize: normalize(10),
  },
  sm: {
    fontSize: normalize(12),
  },
  norm: {
    fontSize: normalize(14),
  },
  large: {
    fontSize: normalize(30),
  },
  xlarge: {
    fontSize: normalize(50),
  },
  red: {
    color: styles.color.ColorRed,
  },
  blue: {
    color: styles.color.ColorDarkBlue,
  },
  lightBlue: {
    color: styles.color.ColorBlue,
  },
  green: {
    color: styles.color.ColorGreen,
  },
  lightGray: {
    color: styles.color.COLOR_GREY_TRANSP,
  },
  gray: {
    color: styles.color.colorText_GrAY,
  },
  black: {
    color: 'black',
  },
  white: {
    color: 'white',
  },
});
