import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import styles from './TextStyles';

export default function PersianText({
  children,
  style,
  type,
  size,
  rtl,
  color,
  black,
  ...rest
}) {
  return (
    <Text
      allowFontScaling={false}
      style={[
        styles.defaultStyles,
        styles[type],
        styles[color],
        styles[size],
        style,
        black && {
          color: 'black',
        },
      ]}
      {...rest}>
      {rtl ? <Text style={styles.hiddenTrick}>ا</Text> : null}
      {children}
    </Text>
  );
}

PersianText.propTypes = {
  type: PropTypes.oneOf(['regular', 'light', 'bold', 'medium', 'ultraLight']),
  size: PropTypes.oneOf(['s', 'sm', 'norm', 'large', 'xlarge']),
  color: PropTypes.oneOf([
    'red',
    'green',
    'blue',
    'lightBlue',
    'lightGray',
    'gray',
    'black',
    'white',
  ]),
  children: PropTypes.node,
  style: Text.propTypes.style,
  rtl: PropTypes.bool,
};

PersianText.defaultProps = {
  type: 'regular',
  size: 'normal',
  color: 'black',
  children: '',
  style: {},
  rtl: true,
};
