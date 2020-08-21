import React, {useState, Component} from 'react';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import {Item, Input, Container, Content} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import styles from '../../config/styles';
import images from '../../config/images';
import {Text} from '../../utils/Kit';
import {Field, reduxForm} from 'redux-form';
import normalize from 'react-native-normalize';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import Dialog from 'react-native-dialog';
import CustomModal from '../../components/CustomModal';
import AsyncStorage from '@react-native-community/async-storage';
import {persianNumber, latinNumber} from '../../lib/persian';
import {ScrollView} from 'react-native-gesture-handler';
import RollCalender from '../../components/RollCalender';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment-jalaali';
class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Father_Name: '',
      Bourning_Time: '',
      Phone: '',
      Mail: '',
      Password: '',
      retPass: '',
      Fix: '',
      visible: true,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      dialog7: false,
      dialog8: false,
      year: '',
      day: '',
      month: '',
      Date: moment(new Date()).format('YYYY/MM/DD hh:mm:ss'),
    };
  }
  componentDidMount() {
    this.initialDate();
  }
  initialDate = () => {
    const {Date} = this.state;
    this.setState({
      year: moment(Date, 'YYYY/MM/DD hh:mm:ss').jYear(),
      month: moment(Date, 'YYYY/MM/DD hh:mm:ss').jMonth(),
      day: moment(Date, 'YYYY/MM/DD hh:mm:ss').jDate(),
    });
  };
  onDateChange = Date => {
    console.log('Date', Date);
    this.setState({Date});
  };
  updateValue(text, field) {
    if (field === 'Name') {
      this.setState({Name: text});
    } else if (field === 'Father_Name') {
      this.setState({Father_Name: text});
    } else if (field === 'Bourning_Time') {
      this.setState({Bourning_Time: text});
    } else if (field === 'Mail') {
      this.setState({Mail: text});
    } else if (field === 'Phone') {
      this.setState({Phone: text});
    } else if (field === 'Password') {
      this.setState({Password: text});
    } else if (field === 'retPass') {
      this.setState({retPass: text});
    } else if (field === 'Fix') {
      this.setState({Fix: text});
    }
  }
  submit = () => {
    let collection = {};
    collection.Name = this.state.Name;
    collection.Father_Name = this.state.Father_Name;
    collection.Bourning_Time = this.state.Bourning_Time;
    collection.Mail = this.state.Mail;
    collection.Phone = this.state.Phone;
    collection.Password = this.state.Password;
    collection.Fix = this.state.Fix;
    console.log(collection);
    if (
      /^[a-z]/.test(collection.Name) ||
      /^[A-Z]/.test(collection.Name) ||
      /^[a-z]/.test(collection.Father_Name) ||
      /^[A-Z]/.test(collection.Father_Name) ||
      collection.Name === '' ||
      collection.Father_Name === ''
    ) {
      this.setState({dialog4: true});
      return;
    }
    if (collection.Phone.length < 11 || collection.Fix < 11) {
      this.setState({dialog5: true});
      return;
    }
    if (!/[@ ]/g.test(collection.Mail) || !/[.com]/g.test(collection.Mail)) {
      this.setState({dialog6: true});
      return;
    }
    if (collection.Password.length < 8) {
      this.setState({dialog1: true});
      return;
    }
    if (this.state.Password !== this.state.retPass) {
      this.setState({dialog2: true});
      return;
    }
    this.setState({dialog3: true});
    fetch('https://jimbooexchange.com/php_api/insert_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: `Name=${collection.Name}&Father_Name=${
        collection.Father_Name
      }&Bourning_Time=${latinNumber(
        `${this.state.year}/${this.state.month}/${this.state.day}`,
      )}&Mail=${collection.Mail}&Phone=${collection.Phone}&Password=${
        collection.Password
      }&Fix=${this.state.Fix}`, // <-- Post parameters
    });
  };
  render() {
    let second;
    let third;
    let forth;
    let fifth;
    let sixth;
    let seven;
    let eight;
    return (
      <ScrollView contentContainerStyle={sajamstyles.container}>
        <View style={sajamstyles.mainView}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: hp(2),
            }}>
            <Text size="large" color="gray">
              ثبت نام جدید
            </Text>
          </View>

          <View style={sajamstyles.View}>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="نام و نام خانوادگی"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                containerStyle={sajamstyles.item}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => second._root.focus()}
                blurOnSubmit={false}
                onChangeText={text => this.updateValue(text, 'Name')}
              />
              <Image
                source={images.login.males}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="نام پدر"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                containerStyle={sajamstyles.item}
                ref={c => (second = c)}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => third._root.focus()}
                blurOnSubmit={false}
                onChangeText={text => this.updateValue(text, 'Father_Name')}
              />
              <Image
                source={images.login.males}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="شماره موبایل"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                maxLength={11}
                keyboardType="phone-pad"
                containerStyle={sajamstyles.item}
                ref={c => (third = c)}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => forth._root.focus()}
                blurOnSubmit={false}
                onChangeText={text => this.updateValue(text, 'Phone')}
              />
              <Image
                source={images.login.phone}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="تلفن ثابت"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                maxLength={11}
                keyboardType="phone-pad"
                containerStyle={sajamstyles.item}
                ref={c => (forth = c)}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => fifth._root.focus()}
                blurOnSubmit={false}
                onChangeText={text => this.setState({Fix: text})}
              />
              <Image
                source={images.login.phone}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="ایمیل"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                containerStyle={sajamstyles.item}
                ref={c => (fifth = c)}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => sixth._root.focus()}
                blurOnSubmit={false}
                onChangeText={text => this.updateValue(text, 'Mail')}
              />
              <Image
                source={images.login.mail}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>

            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholderTextColor="#adb4bc"
                style={[sajamstyles.inputStyle]}
                containerStyle={sajamstyles.item}
                ref={c => (sixth = c)}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => {
                  seven._root.focus();
                }}
                value={persianNumber(
                  `تاریخ تولد  ${this.state.year}/${this.state.month}/${
                    this.state.day
                  }`,
                )}
                blurOnSubmit={false}
                //onChangeText={text => this.updateValue(text, 'Bourning_Time')}
                onFocus={() => {
                  this.RBSheet.open();
                  Keyboard.dismiss();
                }}
              />
              <RBSheet
                ref={ref1 => {
                  this.RBSheet = ref1;
                }}
                height={200}
                duration={250}
                // closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                  container: {
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: styles.color.colorBackground_Gray,
                  },
                  wrapper: {
                    backgroundColor: 'transparent',
                  },
                }}>
                <RollCalender
                  year={this.state.year}
                  onChangeYear={year => this.setState({year})}
                  month={this.state.month}
                  onChangeMonth={month => this.setState({month})}
                  day={this.state.day}
                  onChangeDay={day => this.setState({day})}
                  dateWithHour={this.onDateChange}
                />
                <Button
                  TouchableComponent={TouchableOpacity}
                  title="ثبت"
                  containerStyle={sajamstyles.shadow}
                  buttonStyle={{
                    width: wp(30),
                    borderRadius: normalize(25),
                    height: hp(6),
                  }}
                  titleStyle={sajamstyles.medium}
                  ViewComponent={LinearGradient} // Don't forget this!
                  linearGradientProps={{
                    colors: [
                      styles.color.ColorGreen,
                      styles.color.ColorGreenFos,
                    ],
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 0.5},
                  }}
                  onPress={() => this.RBSheet.close()}
                />
              </RBSheet>
              <Image
                source={images.login.dates}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>

            <Item style={sajamstyles.itemStyle}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({visible: false});
                }}>
                <Image
                  source={images.login.eye}
                  style={{height: hp(5), width: wp(5), marginLeft: wp(5)}}
                  resizeMode="contain"
                  // tintColor={styles.color.ColorGreen}
                />
              </TouchableOpacity>
              <Input
                placeholder="رمز عبور"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                containerStyle={sajamstyles.item}
                multiline={false}
                secureTextEntry={this.state.visible}
                ref={c => (seven = c)}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => eight._root.focus()}
                blurOnSubmit={false}
                onChangeText={text => this.updateValue(text, 'Password')}
              />
              <Image
                source={images.login.lock}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="تکرار رمز عبور"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                containerStyle={sajamstyles.item}
                autoFocus={false}
                ref={c => (eight = c)}
                blurOnSubmit
                multiline={false}
                secureTextEntry={true}
                onChangeText={text => this.updateValue(text, 'retPass')}
              />
              <Image
                source={images.login.lock}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
          </View>
        </View>
        <View style={sajamstyles.view2}>
          <Button
            TouchableComponent={TouchableOpacity}
            ViewComponent={LinearGradient} // Don't forget this!
            title="ثبت نام"
            containerStyle={sajamstyles.shadow}
            buttonStyle={sajamstyles.btn}
            titleStyle={sajamstyles.medium}
            linearGradientProps={{
              colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            onPress={() => this.submit()}
          />
        </View>
        <View
          style={{
            flexDirection: 'row-reverse',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: normalize(20, 'height'),
          }}>
          <Text>ثبت نام کرده اید؟</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text color="green" style={{marginRight: 5}}>
              ورود
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <CustomModal
            isVisible={this.state.dialog1}
            title="خطا در ورود اطلاعات"
            describe="رمز عبور نباید کمتر از 8 حرف باشد"
            onConfirm={() => {
              this.setState({dialog1: false});
            }}
          />
          <CustomModal
            isVisible={this.state.dialog2}
            title="خطا در ثبت اطلاعات"
            describe="رمز ورود و تکرار آن یکسان نیستند"
            onConfirm={() => {
              this.setState({dialog2: false});
            }}
          />
          <CustomModal
            isVisible={this.state.dialog4}
            title="خطا در ورود اطلاعات"
            describe="نام و نام خانوادگی خود را به فارسی تایپ کنید"
            onConfirm={() => {
              this.setState({dialog4: false});
            }}
          />
          <CustomModal
            isVisible={this.state.dialog5}
            title="خطا در ورود اطلاعات"
            describe="شماره تماس خود را به درستی وارد کنید"
            onConfirm={() => {
              this.setState({dialog5: false});
            }}
          />
          <CustomModal
            isVisible={this.state.dialog6}
            title="خطا در ورود اطلاعات"
            describe="ایمیل خود را درست وارد کنید"
            onConfirm={() => {
              this.setState({dialog6: false});
            }}
          />
          <CustomModal
            isVisible={this.state.dialog3}
            title="ثبت نام اولیه شما با موفقیت انجام شد"
            describe="برای انجام معاملات، پس از ورود، ابتدا از بخش احراز حویت، حویت خود را تایید کنید."
            onConfirm={() => {
              this.setState({dialog3: false});
              this.props.navigation.navigate('Login');
            }}
          />
          <CustomModal
            isVisible={this.state.dialog7}
            title="خطا در ورود اطلاعات"
            describe="تاریخ تولد را درست وارد کنید."
            onConfirm={() => {
              this.setState({dialog7: false});
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
export default connect(
  null,
  null,
)(SignInScreen);
const sajamstyles = StyleSheet.create({
  container: {
    height: heightPercentageToDP(95),
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
  },
  img: {height: hp(3), width: wp(3)},
  img2: {height: hp(3.4), width: wp(3.4)},
  mainView: {flex: 1, justifyContent: 'center'},

  formView: {marginHorizontal: '9%'},
  itemStyle: {
    alignSelf: 'center',
    //marginBottom: hp(1),
    paddingRight: wp(5),
  },
  inputStyle: {
    fontFamily: 'IRANSansMobile',
    textAlign: 'right',
    paddingBottom: hp(0.8),
  },
  error: {color: 'red', margin: 5, marginHorizontal: 15},
  view: {
    marginRight: wp(10),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {padding: 10},
  view2: {
    flex: 0.12,
    alignItems: 'center',
  },
  btn: {
    borderRadius: normalize(25),
    paddingVertical: hp(1),
    paddingHorizontal: normalize(40),
  },
  medium: {fontSize: normalize(20), fontFamily: 'IRANSansMobile'},
  shadow: {
    marginTop: hp(1),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
});
