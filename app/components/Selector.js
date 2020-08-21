import React from 'react';
import { View, StyleSheet } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { Text } from 'app/utils/Kit';
import { Icon } from 'react-native-elements';

export default function Selector({
  containerStyle,
  onChange,
  init,
  label = 'label',
  placeHolder,
  keyExtractor,
  data,
  value,
  disabled,
}) {
  return (
    <ModalSelector
      disabled={disabled}
      style={containerStyle}
      data={
        init && data
          ? [{ [label]: init }, ...data]
          : init
          ? [{ [label]: init }]
          : data
      }
      keyExtractor={keyExtractor}
      labelExtractor={item => item[label]}
      supportedOrientations={['portrait']}
      cancelText={'انصراف'}
      selectTextStyle={style.selectTextStyle}
      sectionTextStyle={style.selectTextStyle}
      optionTextStyle={style.selectTextStyle}
      cancelTextStyle={style.cancelTextStyle}
      onChange={onChange}>
      <View style={style.view}>
        <Icon
          name="caretdown"
          type="antdesign"
          size={12}
          color="rgba(0,0,0,.5)"
        />
        <Text style={[style.text, { color: disabled ? 'gray' : undefined }]}>
          {value || init || placeHolder}
        </Text>
      </View>
    </ModalSelector>
  );
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row-reverse',
    height: 60,
    alignItems: 'center',
  },
  text: { marginRight: 20 },
  cancelTextStyle: {
    fontFamily: 'IRANSansMobile',
  },
  selectTextStyle: { fontFamily: 'IRANSansMobile' },
});
