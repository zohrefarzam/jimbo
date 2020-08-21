import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {persianNumber} from '../../lib/persian';
import {Text} from '../../utils/Kit';
import {Form, Item, Input, Content} from 'native-base';
import styles from '../../config/styles';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Icon} from 'react-native-elements';
import moment from 'moment-jalaali';
import CustomModal from '../../components/CustomModal';
import normalize from 'react-native-normalize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Video, {ScrollView, Container} from 'react-native-video-player-hp';
import HTML from 'react-native-render-html';
import WebView from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {number} from 'prop-types';
export default class WeblogDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weblog: null,
      name: '',
      mail: '',
      text: '',
      dialog1: false,
      video: {width: undefined, height: undefined, duration: undefined},
      fullScreen: false,
      thumbnailUrl: undefined,
    };
  }
  onFullScreen(status) {
    // Set the params to pass in fullscreen status to navigationOptions
    this.props.navigation.setParams({
      fullscreen: !status,
    });
    this.setState({fullScreen: status});
    StatusBar.setHidden(status, status ? 'none' : 'slide');
    console.log('status', status);
  }
  componentWillMount = () => {
    this.setState({
      weblog: this.props.navigation.getParam('weblog'),
    });
  };
  onSend = () => {
    const {name, mail, text, weblog} = this.state;
    const date = persianNumber(moment().format('jYYYY/jM/jD hh:mm:ss '));

    if (text === '') {
      this.setState({dialog2: true});
      return;
    }
    if (mail === '') {
      this.setState({dialog3: true});
      return;
    }
    if (!/[@ ]/g.test(mail) || !/[.com]/g.test(mail)) {
      this.setState({dialog5: true});
      return;
    }
    if (name === '') {
      this.setState({dialog4: true});
      return;
    }
    if (text !== '' && name !== '' && mail !== '') {
      fetch('https://jimbooexchange.com/php_api/insert_comment.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
        body: `Name=${name}&Time=${date}&Post_Title=${
          weblog.Mini_Text
        }&Mail=${mail}&Post_Id=${weblog.Id}&Text=${text}`, // <-- Post parameters
      });
      this.setState({dialog1: true});
    }
  };
  render() {
    const {weblog} = this.state;
    let second;
    let third;
    let forth;
    return (
      <ScrollView>
        <View style={{width: '100%', height: 200, marginBottom: hp(2)}}>
          {weblog.Video === 'no' ? (
            <Image
              source={{uri: weblog.Pic}}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <WebView
              source={{
                html: `${weblog.Video}`,
              }}
            />
          )}
        </View>
        {/* <Video
            url={url}
            lockPortraitOnFsExit
            rotateToFullScreen
            onFullScreen={status => this.onFullScreen(status)}
            onError={this.onVideoError}
            error={false}
          /> */}

        {weblog.Sound !== 'no' ? (
          <View style={{flex: 1}}>
            <AutoHeightWebView
              style={{
                width: Dimensions.get('window').width - 100,
                alignSelf: 'center',
              }}
              customStyle={`
               
                audio {
                  width: 100%;
                }
                `}
              /**
               * this should be added in HTML Style Tag!
               */
              // video {
              //   width: "100%";
              //   height: "240";
              // }
              // img {
              //   width: "100%";
              // }
              // onSizeUpdated={size => console.log('size', size)}
              files={[
                {
                  href: 'cssfileaddress',
                  type: 'text/css',
                  rel: 'stylesheet',
                },
              ]}
              /**
               * Sample files to test
               */
              // source={{ uri: 'https://www.google.com/' }}
              // <p>${persianNumber(item.Text)}</p>
              // <img src=${item.Cover} width="100%" />
              // <img src="https://bardotbrush.com/wp-content/uploads/2019/04/Untitled_Artwork-2.gif" width="100%" />
              // <p>${persianNumber(item.Text)}</p>
              // <audio width="100%" height="240" src="https://filesamples.com/samples/audio/mp3/sample1.mp3" controls />
              source={{
                html: `
                  <body>
                    <div>
          
                      <audio width="100%" height="240" src=${
                        weblog.Sound
                      } controls />
                    </div>
                  </body>`,
              }}
              viewportContent={'width=device-width - 100, initial-scale=1.0'}
            />
          </View>
        ) : (
          <View />
        )}

        {/* <Image
            source={{uri: `${weblog.Pic}`}}
            style={{height: heightPercentageToDP(30), width: '100%'}}
          /> */}
        <View style={{margin: 15}}>
          <Text style={{marginRight: wp(8)}}>
            منتشر شده در :
            <Text style={{color: 'gray'}}> {persianNumber(weblog.Time)}</Text>
          </Text>
          <View style={{flex: 1}}>
            <AutoHeightWebView
              style={{
                width: Dimensions.get('window').width - 100,
                alignSelf: 'center',
                marginTop: hp(2),
              }}
              customStyle={`
                div {
                  font-family: IRANSansMobile;
                
                  color: #576574;
                  text-align: justify;
                  direction: rtl;
                }
                `}
              /**
               * this should be added in HTML Style Tag!
               */
              // video {
              //   width: "100%";
              //   height: "240";
              // }
              // img {
              //   width: "100%";
              // }
              // onSizeUpdated={size => console.log('size', size)}
              files={[
                {
                  href: 'cssfileaddress',
                  type: 'text/css',
                  rel: 'stylesheet',
                },
              ]}
              /**
               * Sample files to test
               */
              // source={{ uri: 'https://www.google.com/' }}
              // <p>${persianNumber(item.Text)}</p>
              // <img src=${item.Cover} width="100%" />
              // <p>${persianNumber(item.Text)}</p>
              // <audio width="100%" height="240" src="https://filesamples.com/samples/audio/mp3/sample1.mp3" controls />
              source={{
                html: `
                  ${weblog.Text}`,
              }}
              viewportContent={'width=device-width - 100, initial-scale=1.0'}
            />
          </View>
        </View>

        <View />
        <View />
        <View
          style={{
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginLeft: wp(20),
            marginRight: wp(11),
          }}>
          <Icon name="ios-bookmark" type="ionicon" color="#517fa4" />
          <Text style={{fontSize: normalize(12)}} color="gray">
            {weblog.Tag}
          </Text>
        </View>
        <Form>
          <View style={{margin: 15}}>
            <Text style={{fontSize: normalize(18)}}>
              دیدگاه خود را بیان کنید.
            </Text>
          </View>
          <Item
            style={{
              margin: 15,
              borderBottomColor: styles.color.ColorGreen,
              borderBottomWidth: 1.5,
            }}>
            <Input
              style={style.inputStyle}
              placeholder="متن دیدگاه"
              placeholderTextColor="#adb4bc"
              //multiline={true}
              numberOfLines={2}
              returnKeyType={'done'}
              autoFocus={false}
              onSubmitEditing={() => second._root.focus()}
              blurOnSubmit={false}
              onChangeText={t => this.setState({text: t})}
            />
          </Item>
          <View>
            <Item
              style={{
                margin: 15,
                borderBottomColor: styles.color.ColorGreen,
                borderBottomWidth: 1.5,
              }}>
              <Input
                style={style.inputStyle}
                placeholder="پست الکترونیک"
                placeholderTextColor="#adb4bc"
                multiline={false}
                numberOfLines={1}
                ref={c => (second = c)}
                returnKeyType={'done'}
                autoFocus={false}
                onSubmitEditing={() => third._root.focus()}
                blurOnSubmit={false}
                onChangeText={t => this.setState({mail: t})}
              />
            </Item>
            <Item
              style={{
                margin: 15,
                borderBottomColor: styles.color.ColorGreen,
                borderBottomWidth: 1.5,
              }}>
              <Input
                style={style.inputStyle}
                placeholder="نام و نام خانوادگی"
                placeholderTextColor="#adb4bc"
                multiline={false}
                numberOfLines={1}
                ref={c => (third = c)}
                returnKeyType={'done'}
                autoFocus={false}
                blurOnSubmit={false}
                onChangeText={t => this.setState({name: t})}
              />
            </Item>
          </View>
        </Form>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1%',
          }}>
          <Button
            TouchableComponent={TouchableOpacity}
            ViewComponent={LinearGradient} // Don't forget this!
            title="ارسال دیدگاه"
            containerStyle={style.shadow}
            buttonStyle={style.btn}
            titleStyle={style.medium}
            linearGradientProps={{
              colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            onPress={() => this.onSend()}
          />
        </View>
        <CustomModal
          isVisible={this.state.dialog1}
          onConfirm={() => this.setState({dialog1: false})}
          title="ارسال شد"
          describe="دیدگاه شما با موفقیت ارسال شد"
        />
        <CustomModal
          isVisible={this.state.dialog2}
          onConfirm={() => this.setState({dialog2: false})}
          title="خطا در ورود اطلاعات"
          describe="متن دیدگاه نمیتواند خالی باشد"
        />
        <CustomModal
          isVisible={this.state.dialog3}
          onConfirm={() => this.setState({dialog3: false})}
          title="خطا در ورود اطلاعات"
          describe="ایمیل نمیتواند خالی باشد"
        />
        <CustomModal
          isVisible={this.state.dialog4}
          onConfirm={() => this.setState({dialog4: false})}
          title="خطا در ورود اطلاعات"
          describe="نام و نام خانوادگی نمیتواند خالی باشد"
        />
        <CustomModal
          isVisible={this.state.dialog5}
          onConfirm={() => this.setState({dialog5: false})}
          title="خطا در ورود اطلاعات"
          describe="ایمیل خود را به درستی وارد کنید"
        />
      </ScrollView>
    );
  }
}
const style = StyleSheet.create({
  inputStyle: {
    fontFamily: 'IRANSansMobile',
    textAlign: 'right',
    paddingRight: 15,
  },
  btn: {borderRadius: 30, width: wp(45)},
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
    borderRadius: 30,
    width: wp(45),
  },
  btnView: {marginHorizontal: wp(30), flex: 1},
});
