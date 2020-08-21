/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Container, Content, Segment, Button} from 'native-base';
import {Hesab, Wallet, Bank, Sheba, Auth} from './components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from '../../config/styles';
import images from '../../config/images';
import {Text} from '../../utils/Kit';
import normalize from 'react-native-normalize';
import Tab6 from './components/Tab6';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: 6,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  setInitialPage = seg => this.setState({seg});
  selectComponent = seg => () => this.setState({seg});

  render() {
    const _renderComponent = () => {
      switch (this.state.seg) {
        case 6:
          return <Auth />;
          case 5:
            return <Tab6 />;
        case 4:
          return <Wallet />;
        case 3:
          return <Sheba />;
        case 2:
          return <Bank />;
        case 1:
          return <Hesab />;
      }
    };
    return (
      <Container style={{backgroundColor: styles.color.colorBackground_Gray}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp(3),
          }}>
          <Image
            resizeMode="contain"
            tintColor={styles.color.ColorGreen}
            source={images.tab.profile}
            style={{
              height: hp(15),
              width: wp(20),
              tintColor: styles.color.ColorGreen,
            }}
          />
          <Text style={{color: styles.color.ColorGreen, fontSize: 16}}>
            پروفایل من
          </Text>
        </View>

        <View style={style.tabView}>
          <Segment style={{backgroundColor: styles.color.colorBackground_Gray}}>
            <Button
              first
              style={[
                style.tab,
                {
                  borderTopColor: styles.color.COLOR_DARK_SEPERATOR,
                  //borderColor: 'white',
                  backgroundColor:
                    this.state.seg === 1 ? styles.color.ColorGray : 'white',
                  borderBottomColor:
                    this.state.seg === 1
                      ? styles.color.ColorGreen
                      : styles.color.COLOR_DARK_SEPERATOR,
                  borderBottomWidth: 2,
                },
              ]}
              active={this.state.seg === 5 ? true : false}
              onPress={this.selectComponent(1)}>
              <Text
                style={[
                  style.font,
                  {
                    color:
                      this.state.seg === 1
                        ? styles.color.ColorGreen
                        : styles.color.colorText_GrAY,
                  },
                ]}>
                احراز هویت
              </Text>
            </Button>
            <Button
              style={[
                style.tab,
                {
                  borderTopColor: styles.color.COLOR_DARK_SEPERATOR,
                  // borderColor: 'white',
                  backgroundColor:
                    this.state.seg === 2 ? styles.color.ColorGray : 'white',
                  borderBottomColor:
                    this.state.seg === 2
                      ? styles.color.ColorGreen
                      : styles.color.COLOR_DARK_SEPERATOR,
                  borderBottomWidth: 2,
                },
              ]}
              active={this.state.seg === 2 ? true : false}
              onPress={this.selectComponent(2)}>
              <Text
                style={[
                  style.font,
                  {
                    color:
                      this.state.seg === 2
                        ? styles.color.ColorGreen
                        : styles.color.colorText_GrAY,
                  },
                ]}>
                کیف پول
              </Text>
            </Button>

            <Button
              style={[
                style.tab,

                {
                  borderTopColor: styles.color.COLOR_DARK_SEPERATOR,
                  //borderColor: 'white',
                  backgroundColor:
                    this.state.seg === 3 ? styles.color.ColorGray : 'white',
                  borderBottomColor:
                    this.state.seg === 3
                      ? styles.color.ColorGreen
                      : styles.color.COLOR_DARK_SEPERATOR,
                  borderBottomWidth: 2,
                },
              ]}
              active={this.state.seg === 3 ? true : false}
              onPress={this.selectComponent(3)}>
              <Text
                style={[
                  style.font,
                  {
                    color:
                      this.state.seg === 3
                        ? styles.color.ColorGreen
                        : styles.color.colorText_GrAY,
                  },
                ]}>
                شماره شبا
              </Text>
            </Button>

            <Button
              last
              style={[
                style.tab,

                {
                  borderTopColor: styles.color.COLOR_DARK_SEPERATOR,
                  // borderColor: 'white',
                  backgroundColor:
                    this.state.seg === 4 ? styles.color.ColorGray : 'white',
                  borderBottomColor:
                    this.state.seg === 4
                      ? styles.color.ColorGreen
                      : styles.color.COLOR_DARK_SEPERATOR,
                  borderBottomWidth: 2,
                },
              ]}
              active={this.state.seg === 4 ? true : false}
              onPress={this.selectComponent(4)}>
              <Text
                style={[
                  style.font,
                  {
                    color:
                      this.state.seg === 4
                        ? styles.color.ColorGreen
                        : styles.color.colorText_GrAY,
                  },
                ]}>
                کارت بانکی
              </Text>
            </Button>
            <Button
              
              style={[
                style.tab,
                {
                  borderTopColor: styles.color.COLOR_DARK_SEPERATOR,
                  backgroundColor:
                    this.state.seg === 5 ? styles.color.ColorGray : 'white',
                  borderBottomColor:
                    this.state.seg === 5
                      ? styles.color.ColorGreen
                      : styles.color.COLOR_DARK_SEPERATOR,
                  borderBottomWidth: 2,
                },
              ]}
              active={this.state.seg === 5 ? true : false}
              onPress={this.selectComponent(5)}>
              <Text
                style={[
                  style.font,
                  {
                    color:
                      this.state.seg === 5
                        ? styles.color.ColorGreen
                        : styles.color.colorText_GrAY,
                  },
                ]}>
                تراکنش ها
              </Text>
            </Button>
            <Button
              last
              style={[
                style.tab,
                {
                  borderTopColor: styles.color.COLOR_DARK_SEPERATOR,
                  backgroundColor:
                    this.state.seg === 6 ? styles.color.ColorGray : 'white',
                  borderBottomColor:
                    this.state.seg === 6
                      ? styles.color.ColorGreen
                      : styles.color.COLOR_DARK_SEPERATOR,
                  borderBottomWidth: 2,
                },
              ]}
              active={this.state.seg === 6 ? true : false}
              onPress={this.selectComponent(6)}>
              <Text
                style={[
                  style.font,
                  {
                    color:
                      this.state.seg === 6
                        ? styles.color.ColorGreen
                        : styles.color.colorText_GrAY,
                  },
                ]}>
                حساب
              </Text>
            </Button>
          </Segment>
        </View>

        <Content>{_renderComponent()}</Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  backContainer: {padding: 20, position: 'absolute', top: 0, left: 0},
  banner: {flex: 3, alignItems: 'flex-end', height: 70},
  title: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    padding: 5,
    color: 'white',
    fontSize: normalize(16),
  },
  column: {flexDirection: 'column'},
  avatarContainer: {flex: 1, alignItems: 'center'},
  subView: {
    borderLeftWidth: 0.4,
    borderLeftColor: styles.color.colorText_GrAY,
  },
  pl1: {paddingLeft: 10},
  image: {width: 90, height: 60},
  titleView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 25,
    // position: 'absolute',
    //top: 0,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingRight: 25,
    paddingVertical: 20,
    marginTop: hp(11),
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
  },
  grayTxt: {color: styles.color.COLOR_GREY, fontSize: normalize(12)},
  topData: {
    flexDirection: 'row-reverse',
    alignSelf: 'center',
  },
  price: {
    color: styles.color.ColorDarkBlue,
    fontSize: normalize(18),
    textAlign: 'right',
    margin: 10,
    marginRight: '5%',
  },
  tabView: {marginHorizontal: wp(0), marginVertical: hp(2)},
  tab: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: hp(8),

    height: hp(5.5),
  },
  font: {fontSize: normalize(14)},
});
