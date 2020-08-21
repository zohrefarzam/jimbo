import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import {Form, Item, Input, Container, Content} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Text} from '../../utils/Kit';
import styles from '../../config/styles';
import images from '../../config/images';
import {Button, CheckBox} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'react-native-normalize';
import {Component} from 'react';
import {connect} from 'react-redux';
import {GetUser} from '../../api/methods/GetUser';
import AsyncStorage from '@react-native-community/async-storage';
import CustomModal from '../../components/CustomModal';
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      log: true,
      dialog1: false,
      dialog2: false,
      check: true,
    };
  }

  async componentWillMount() {
    this.props.dispatch(GetUser());
    const password = await AsyncStorage.getItem('password');
    const mail = await AsyncStorage.getItem('mail');

    if (this.state.check === true) {
      this.setState({password: password});
      this.setState({phone: mail});
    }
  }
  CheckUser = (phone, password) => {
    const {user, navigation} = this.props;
    // const result = user.find(({Name}) => Name === phone);
    // const res = JSON.stringify(result.Name);
    if (
      user.find(({Phone}) => Phone === phone) ||
      user.find(({Mail}) => Mail === phone)
    ) {
      let result =
        user.find(({Phone}) => Phone === phone) ||
        user.find(({Mail}) => Mail === phone);

      if (result?.Password === password) {
      } else {
        this.setState({dialog2: true});
        return;
      }
    } else {
      this.setState({dialog1: true});
      return;
    }

     this.setState({dialog3: true});
    const result =
      user.find(({Phone}) => Phone === phone) ||
      user.find(({Mail}) => Mail === phone);
    AsyncStorage.setItem('check', this.state.check);
    AsyncStorage.setItem('name', result.Name);
    AsyncStorage.setItem('father', result.Father_Name);
    AsyncStorage.setItem('date', result.Bourning_Time);
    AsyncStorage.setItem('mail', result.Mail);
    AsyncStorage.setItem('phone', result.Phone);
    AsyncStorage.setItem('password', result.Password);
    AsyncStorage.setItem('id', result.Id);

    // navigation.navigate('Home');
  };
  toggleSwitch = () => {
    this.setState({check: !this.state.check});
    if (this.state.check === false) {
      this.setState({phone: ''});
      this.setState({password: ''});
    }
  };
  render() {
    const {user, navigation} = this.props;
    //const result = user.find(({Phone}) => Phone === 'امیرمحمد کاتب صابر');
    return (
      <Container style={sajamstyles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text size="large" color="gray">
            ورود
          </Text>
        </View>
        <View style={sajamstyles.mainView}>
          <Form style={sajamstyles.formView}>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="آدرس ایمیل یا شماره تماس شما"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                // maxLength={11}
                //keyboardType="phone-pad"
                containerStyle={sajamstyles.item}
                autoFocus={false}
                blurOnSubmit
                value={this.state.phone}
                onChangeText={t => this.setState({phone: t})}
              />
              <Image
                source={images.login.phone}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>

            <View style={{marginTop: 20}} />
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="رمز"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                secureTextEntry={true}
                containerStyle={sajamstyles.item}
                blurOnSubmit
                autoFocus={false}
                value={this.state.password}
                onChangeText={t => this.setState({password: t})}
              />
              <Image
                source={images.login.lock}
                style={sajamstyles.img2}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
          </Form>
          <View
            style={{
              flexDirection: 'row-reverse',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginRight: 50,
            }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginRight: -10,
              }}>
              <Text color="gray" size="sm" style={{marginRight: -10}}>
                مرا به خاطر بسپار
              </Text>
              <CheckBox
                checkedColor={styles.color.ColorGreen}
                onPress={() => {
                  this.toggleSwitch();
                }}
                checked={this.state.check}
              />
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ForgotPass')}>
                <Text color="green" size="sm">
                  رمز عبور خود را فراموش کرده ام
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={sajamstyles.view2}>
          <Button
            TouchableComponent={TouchableOpacity}
            ViewComponent={LinearGradient} // Don't forget this!
            title="ورود"
            containerStyle={sajamstyles.shadow}
            buttonStyle={sajamstyles.btn}
            titleStyle={sajamstyles.medium}
            linearGradientProps={{
              colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            // onPress={() => navigation.navigate('Home')}
            onPress={() =>
              this.CheckUser(this.state.phone, this.state.password)
            }
          />
        </View>
        <View
          style={{
            flexDirection: 'row-reverse',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: normalize(20),
          }}>
          <Text>ثبت نام نکرده اید؟</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text color="green" style={{marginRight: 5}}>
              ثبت نام
            </Text>
          </TouchableOpacity>
        </View>
        <CustomModal
          isVisible={this.state.dialog1}
          title="خطا در ورود اطلاعات"
          describe="اطلاعات کاربری خود را به درستی وارد کنید"
          onConfirm={() => {
            this.setState({dialog1: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog2}
          title="خطا در ورود اطلاعات"
          describe="پسورد خود را به درستی وارد کنید"
          onConfirm={() => {
            this.setState({dialog2: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog3}
          title="خوش آمدید"
          onConfirm={() => {
            this.setState({dialog3: false});
            navigation.navigate('Home');
          }}
        />
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user.items,
  loading: state.prices.loading,
  error: state.prices.error,
});

export default connect(mapStateToProps)(LoginScreen);
const sajamstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
  },
  img: {height: hp(3), width: wp(3)},
  img2: {height: hp(3.1), width: wp(3.1)},
  mainView: {height: hp(50), justifyContent: 'center'},

  formView: {marginHorizontal: '9%'},
  item: {
    alignSelf: 'center',
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
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    borderRadius: normalize(25),
    paddingVertical: hp(1),
    paddingHorizontal: normalize(50),
    elevation: 3,
  },
  medium: {fontSize: normalize(20), fontFamily: 'IRANSansMobile'},
  shadow: {
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
