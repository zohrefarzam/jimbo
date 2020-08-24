import React from 'react';
import {StatusBar, Animated, Easing} from 'react-native';
import {Container} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../config/styles';
import AsyncStorage from '@react-native-community/async-storage';
import normalize from 'react-native-normalize';

export default class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.opacityValue = new Animated.Value(0);
    this.state = {
      phone: '',
    };
  }

  async componentWillMount() {
    const phone = await AsyncStorage.getItem('phone');
    this.setState({phone: phone});
    setTimeout(() => {
      if (this.state.phone === null) {
        this.props.navigation.navigate('Auth');
      } else {
        this.props.navigation.navigate('Home');
      }
    }, 5000);

    this.opacityValue.setValue(0);
    Animated.timing(this.opacityValue, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const opacity = this.opacityValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 1],
    });
    const rotateY = this.opacityValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg'],
    });
    return (
      <Container style={{flex: 1}}>
        <LinearGradient
          colors={[AppStyles.color.ColorGreenFos, AppStyles.color.ColorGreen]}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar hidden={true} />
          <Animated.Image
            source={require('../../assets/images/global/jb.png')}
            style={{opacity, height: 150, width: 150}}
          />
          <Animated.Text
            style={{
              opacity,
              marginTop: 25,
              color: 'white',
              fontFamily: 'IRANSansMobile',
              fontSize: normalize(38),
              evolation: 5,
            }}>
            جیمبو
          </Animated.Text>
        </LinearGradient>
      </Container>
    );
  }
}
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
