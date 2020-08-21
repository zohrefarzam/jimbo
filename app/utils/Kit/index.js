import React from 'react';
import {Text} from 'react-native';
import {persianNumber} from '../../lib/persian';
import styles from './Text/TextStyles';
import AppStyles from './../../config/styles';

// export { default as TextInput } from './TextInput/TextInput';
// export { default as Modal } from './Modal/Modal';
export {default as Text} from './Text/Text';
export const addPlus = n =>
  n > 0 ? `+${n.toString().replace(/[+-]/g, '')}` : n;
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export const TextNumber = ({
  children,
  style,
  plus,
  type,
  colored,
  black,
  percent,
  million,
  dollor,
  rial,
}) => (
  <Text
    style={[
      style,
      styles.defaultStyles,
      styles[type],
      colored && {
        color:
          children < 0 ? AppStyles.color.ColorRed : AppStyles.color.ColorGreen,
      },
      // eslint-disable-next-line react-native/no-inline-styles
      black && {
        color: 'black',
      },
    ]}>
    {!plus
      ? persianNumber(numberWithCommas(Number(children || 0)) || null)
      : persianNumber(numberWithCommas(addPlus(Number(children || 0))) || null)}
    {percent && '%'}
    {million && ' M'}
    {dollor && '$'}
    {rial && 'ریال'}
  </Text>
);
