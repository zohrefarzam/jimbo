import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import images from '../../config/images';
import styles from '../../config/styles';
import {Text} from '../../utils/Kit';
import {Button} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import normalize from 'react-native-normalize';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  //this.props.navigation.navigate('Auth');

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={style.container}>
          <Image
            source={images.global.logo}
            style={{height: hp(35), width: wp(35)}}
            resizeMode="contain"
          />

          <View style={style.view2}>
            <Button
              TouchableComponent={TouchableOpacity}
              ViewComponent={LinearGradient} // Don't forget this!
              title="ثبت نام"
              containerStyle={style.shadow}
              buttonStyle={style.btn}
              titleStyle={style.medium}
              linearGradientProps={{
                colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
                start: {x: 0, y: 0.5},
                end: {x: 1, y: 0.5},
              }}
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
            <Button
              TouchableComponent={TouchableOpacity}
              // Don't forget this!
              style={style.shadow}
              title="ورود"
              //containerStyle={style.shadow}
              buttonStyle={style.btn2}
              titleStyle={style.medium2}
              onPress={() => this.props.navigation.navigate('Login')}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Home')}>
          <View
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              flexWrap: 'nowrap',
              justifyContent: 'flex-start',
              margin: normalize(30),
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}>
              <Image
                source={images.global.arrow_right}
                style={{height: hp(2), width: wp(2), marginHorizontal: wp(2)}}
              />
            </TouchableOpacity>
            <Text color="gray" size="norm">
              ورود به اپلیکیشن
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    alignItems: 'center',
  },
  btn: {
    borderRadius: normalize(25),
    //paddingVertical: hp(1),
    paddingHorizontal: normalize(40),
  },
  medium: {fontSize: normalize(20), fontFamily: 'IRANSansMobile'},
  medium2: {
    fontSize: normalize(20),
    fontFamily: 'IRANSansMobile',
    color: styles.color.colorText_GrAY,
  },
  shadow: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: 20,
  },
  btn2: {
    borderRadius: normalize(25),
    //paddingVertical: hp(1),
    paddingHorizontal: normalize(50),
    backgroundColor: 'white',
    elevation: 3,
  },
});
