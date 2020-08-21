import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from 'native-base';
import Dialog from 'react-native-dialog';
import { Text } from 'app/utils/Kit';
import { persianNumber } from '../lib/persian';
import Selector from '../components/Selector';
import styles from '../config/styles';
import { onChange } from 'react-native-reanimated';
export default function CustomModal({
  title,
  describe,
  cancleTitle = 'انصراف',
  confirmTitle = 'باشه',
  onCancle,
  onConfirm,
  onGallery,
  onCamera,
  input,
  picker,
  onChangeText,
  onChangeSelect,
  isVisible = false,
  data,
  value,
  input2,
  place1, place2,
  onChangeText2
}) {
  const [selected, setSelected] = useState('');
  // const onValueChange = value => {
  //   setSelected(value);
  // };
  return (
    <Dialog.Container visible={isVisible} contentStyle={style.radius}>
      {title && (
        <Dialog.Title style={style.title}>
          <Text type="bold" color="green">
            {persianNumber(title)}
          </Text>
        </Dialog.Title>
      )}
      {describe && (
        <Dialog.Description>
          <Text color="gray">{persianNumber(describe)}</Text>
        </Dialog.Description>
      )}
      {input && <Dialog.Input style={{ borderColor: styles.color.ColorGreen, borderWidth: 1, borderRadius: 10 }} onChangeText={onChangeText} placeholder={place1} />}
      {input2 && <Dialog.Input style={{ borderColor: styles.color.ColorGreen, borderWidth: 1, borderRadius: 10 }} onChangeText={onChangeText2} placeholder={place2} />}
      {picker && <Selector
        containerStyle={style.flex2}
        keyExtractor={item => item.value}
        label="value"
        data={data}
        placeHolder="انتخاب کنید"
        onChange={onChangeSelect}
        value={value} />}
      <View style={style.btnView}>
        {!!onCancle && (
          <Dialog.Button
            style={style.greenTxt}
            label={cancleTitle}
            onPress={onCancle}
          />
        )}
        {!!onConfirm && (
          <Dialog.Button
            style={style.redTxt}
            label={confirmTitle}
            onPress={onConfirm}
          />
        )}
        {!!onCamera && (
          <Dialog.Button
            style={style.blueTxt}
            label="دوربین"
            onPress={onCamera}
          />
        )}
        {!!onGallery && (
          <Dialog.Button
            style={style.blueTxt}
            label="گالری"
            onPress={onGallery}
          />
        )}
      </View>
    </Dialog.Container>
  );
}

const style = StyleSheet.create({
  radius: {
    borderRadius: 25,
    backgroundColor: styles.color.colorBackground_Gray,
    paddingVertical: 20,
  },
  btnView: { flexDirection: 'row', flexWrap: 'nowrap' },
  redTxt: { color: styles.color.ColorRed },
  greenTxt: { color: styles.color.ColorGreen},
});
