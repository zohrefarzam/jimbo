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
class ForgotPassScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      log: true,
      dialog1: false,
      dialog2: false,
      check: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(GetUser());
  }
  CheckUser = phone => {
    const {user, navigation} = this.props;

    const result = user.find(({Phone}) => Phone === phone);
    const password = JSON.stringify(parseInt(result.Password));
    fetch('https://jimbooexchange.com/php_api/send_sms.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: `code=${password}&theme=${29439}&phone=${phone}`, // <-- Post parameters
    }).then(this.setState({dialog1: true}));
  };
  toggleSwitch = () => {
    this.setState({check: !this.state.check});
  };
  render() {
    const {user, navigation} = this.props;
    //const result = user.find(({Phone}) => Phone === 'امیرمحمد کاتب صابر');
    return (
      <Container style={sajamstyles.container}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text size="large" color="gray">
            فراموشی رمز عبور
          </Text>
        </View>
        <View style={sajamstyles.mainView}>
          <Form style={sajamstyles.formView}>
            <Item style={sajamstyles.itemStyle}>
              <Input
                placeholder="شماره موبایل"
                placeholderTextColor="#adb4bc"
                style={sajamstyles.inputStyle}
                maxLength={11}
                keyboardType="phone-pad"
                containerStyle={sajamstyles.item}
                autoFocus={false}
                blurOnSubmit
                onChangeText={t => this.setState({phone: t})}
              />
              <Image
                source={images.login.phone}
                style={sajamstyles.img}
                resizeMode="contain"
                tintColor={styles.color.ColorGreen}
              />
            </Item>
          </Form>
        </View>
        <View style={sajamstyles.view2}>
          <Button
            TouchableComponent={TouchableOpacity}
            ViewComponent={LinearGradient} // Don't forget this!
            title="ارسال کلمه عبور"
            containerStyle={sajamstyles.shadow}
            buttonStyle={sajamstyles.btn}
            titleStyle={sajamstyles.medium}
            linearGradientProps={{
              colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            // onPress={() => navigation.navigate('Home')}
            onPress={() => this.CheckUser(this.state.phone)}
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
          <Text> کاربر جدید هستید؟</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text color="green" style={{marginRight: 5}}>
              اکنون یک حساب کاربری جدید بسازید
            </Text>
          </TouchableOpacity>
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
          title="ارسال شد"
          describe="رمز عبور با موفقیت برای شما ارسال شد "
          onConfirm={() => this.props.navigation.navigate('Login')}
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

export default connect(mapStateToProps)(ForgotPassScreen);
const sajamstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
  },
  img: {height: hp(3), width: wp(3)},
  img2: {height: hp(3.1), width: wp(3.1)},
  mainView: {height: hp(17), justifyContent: 'center'},

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
