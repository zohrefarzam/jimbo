import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {persianNumber} from '../../../lib/persian';
import styles from '../../../config/styles';
import {Text} from '../../../utils/Kit';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-community/async-storage';
export default class Tab5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      father: '',
      date: '',
      phone: '',
    };
  }
  async componentWillMount() {
    const name = await AsyncStorage.getItem('name');
    const father = await AsyncStorage.getItem('father');
    const date = await AsyncStorage.getItem('date');
    const phone = await AsyncStorage.getItem('phone');
    this.setState({name: name});
    this.setState({father: father});
    this.setState({date: date});
    this.setState({phone: phone});
  }
  render() {
    return (
      <View>
        <Text
          size="norm"
          style={{
            marginHorizontal: wp(3),
            marginVertical: hp(2),
            marginBottom: hp(4),
          }}>
          {' '}
          مشخصات حساب کاربری شما به شرح زیر می باشد :{' '}
        </Text>
        <View style={style.main}>
          <View style={style.card}>
            <View style={style.titleView}>
              <Text style={style.title}>نام و نام خانوادگی</Text>
            </View>
            <View style={style.js}>
              <Text style={style.number}>{this.state.name}</Text>
            </View>
          </View>
        </View>
        <View style={style.main}>
          <View style={style.card}>
            <View style={style.titleView}>
              <Text style={style.title}>نام پدر</Text>
            </View>
            <View style={style.js}>
              <Text style={style.number}>{this.state.father}</Text>
            </View>
          </View>
        </View>
        <View style={style.main}>
          <View style={style.card}>
            <View style={style.titleView}>
              <Text style={style.title}>شماره موبایل</Text>
            </View>
            <View style={style.js}>
              <Text style={style.number}>
                {persianNumber(this.state.phone)}
              </Text>
            </View>
          </View>
        </View>
        <View style={style.main}>
          <View style={style.card}>
            <View style={style.titleView}>
              <Text style={style.title}>تاریخ تولد</Text>
            </View>
            <View style={style.js}>
              <Text style={style.number}>{persianNumber(this.state.date)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  main: {marginHorizontal: wp(6), padding: 5, paddingBottom: 20,},
  card: {
    borderColor: styles.color.COLOR_DARK_SEPERATOR,
    borderWidth: 2,
    borderRadius: 10,
    height:hp(7.5),
  },
  titleView: {
    position: 'absolute',
    zIndex: -1,
    right: wp(2),
 
    bottom: normalize(38, 'height'),
    backgroundColor: styles.color.colorBackground_Gray,
    paddingHorizontal: 7,
    paddingLeft: 10,
  },
  title: {
    color: styles.color.colorText_GrAY,
    backgroundColor: styles.color.colorBackground_Gray,
    fontSize: normalize(15),
  },
  js: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    marginRight: wp(20),
  },
  right: {alignItems: 'flex-end'},
  number: {margin: 20, fontSize: normalize(16), marginVertical: hp(1.5)},
  subView: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(2),
  },
  grayTxt: {
    color: styles.color.colorText_GrAY,
    fontSize: 12,
  },
});
