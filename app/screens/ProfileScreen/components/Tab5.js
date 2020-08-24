import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {persianNumber} from '../../../lib/persian';
import styles from '../../../config/styles';
import {Text} from '../../../utils/Kit';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
class Tab5 extends Component {
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
  Exit = () => {
    AsyncStorage.removeItem('phone');
    AsyncStorage.removeItem('password');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('father');
    AsyncStorage.removeItem('date');
    AsyncStorage.removeItem('mail');
    this.props.navigation.navigate('Auth');
  };
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row-reverse',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
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
          <View style={{marginLeft: hp(3)}}>
            <Button
              TouchableComponent={TouchableOpacity}
              ViewComponent={LinearGradient} // Don't forget this!
              title="خروج"
              containerStyle={style.shadow}
              buttonStyle={style.btn}
              titleStyle={style.medium}
              linearGradientProps={{
                colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
                start: {x: 0, y: 0.5},
                end: {x: 1, y: 0.5},
              }}
              onPress={() => this.Exit()}
            />
          </View>
        </View>
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
export default withNavigation(Tab5);
const style = StyleSheet.create({
  btn: {borderRadius: 20, paddingHorizontal: 10},
  medium: {fontSize: normalize(16), fontFamily: 'IRANSansMobile'},
  shadow: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  btnView: {marginHorizontal: wp(30), flex: 1},
  main: {marginHorizontal: wp(6), padding: 5, paddingBottom: 20},
  card: {
    borderColor: styles.color.COLOR_DARK_SEPERATOR,
    borderWidth: 2,
    borderRadius: 10,
    height: hp(7.5),
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
