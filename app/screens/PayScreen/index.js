import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Linking} from 'react-native';
import {tsImportEqualsDeclaration} from '@babel/types';
import {Card, Item, Input} from 'native-base';
import {persianNumber} from '../../lib/persian';
import moment from 'moment-jalaali';
import {Text} from '../../utils/Kit';
import images from '../../config/images';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../config/styles';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-community/async-storage';
import {FetchSetting} from '../../api/methods/FetchPrices';
import {connect} from 'react-redux';
import CustomModal from '../../components/CustomModal';
class PayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      btn: 'پرداخت',
      name: '',
      id: '',
      phone: '',
      mail: '',
      dialog1: false,
      dollar: [],
      vocher: [],
    };
  }
  async componentWillMount() {
    this.props.dispatch(FetchSetting());
    fetch('https://api.tgju.online/v1/data/sana/json')
      .then(response => response.json())
      .then(json => {
        this.setState({dollar: json});
      })
      .catch(error => console.error(error));
    this.props.navigation.getParam('title');
    this.setState({title: this.props.navigation.getParam('title')});
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');
    const phone = await AsyncStorage.getItem('phone');
    const mail = await AsyncStorage.getItem('mail');
    this.setState({name: name});
    this.setState({id: id});
    this.setState({phone: phone});
    this.setState({mail: mail});
  }
  renderDescribe = () => {
    const {title} = this.state;
    if (title === 'پرفکت مانی') {
      return 'پس از پرداخت وجه ووچر به تناسب مبلغ به صورت آنی ووچر شما صادر خواهد شد';
    } else {
      return ' پس از پرداخت، مقدار ارز متناسب با پرداخت در کمتر از 3 ساعت به حساب شما واریز میگردد';
    }
  };
  idPay = arz => {
    const {name, id, phone, mail, rial, title} = this.state;
    const rand = Math.floor(Math.random() * 10000) + 1;

    fetch(
      `https://jimbooexchange.com/php_api/idpey_webservice_mob.php?costt=${rial}&usname=${name}&uid=${id}&kind=${arz}&mail=${mail}&phone=${phone}&order_id=${rand}&value=${title}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
      },
    )
      .then(function(response) {
        return response.text();
      })
      .then(async function(text) {
        return text;
      })
      .then(text =>
        Linking.canOpenURL(text).then(supported => {
          if (supported) {
            Linking.openURL(text);
          } else {
            console.log("Don't know how to open URI: " + text);
          }
        }),
      )
      .catch(function(error) {
        console.log('Request failed', error);
      });
  };
  buyVocher = () => {
    const {rial, dollar, vocher, name, id} = this.state;
    const {setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const p = parseInt(dollar?.sana_buy_usd?.p);
    const def = Math.abs(d + p);
    const cost = Math.abs(rial / def).toFixed(2);
    const date = persianNumber(moment().format('jYYYY/jM/jD hh:mm:ss '));
    fetch(
      `https://jimbooexchange.com/php_api/evocher_buy_perfect.php?Cost=${cost}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
      },
    )
      .then(response => response.json()) //   <------ this line
      .then(response => {
        return response;
      })
      .then(res =>
        fetch('https://jimbooexchange.com/php_api/insert_transaction.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
          },
          body: `Code=${`اعتبار ووچر:${res.VOUCHER_AMOUNT}کد ووچر:${
            res.VOUCHER_CODE
          }شماره ووچر:${
            res.VOUCHER_NUM
          }`}&Time=${date}&Reason=${'خرید ووچر پرفکت مانی'}&Cost=${cost}&User_Name=${name}&User_Id=${id}`,
        })
          .then(function(json) {
            console.log('request succeeded with json response', json);
          })
          .catch(function(error) {
            console.log('request failed', error);
          }),
      );
  };

  onSubmit = () => {
    const {rial, title} = this.state;
    const {setting} = this.props;
    const min = parseInt(setting[0]?.Min_Curency);
    const max = parseInt(setting[0]?.Max_Curency);
    if (rial < min) {
      this.setState({dialog1: true});
    } else if (rial > max) {
      this.setState({dialog2: true});
    } else if (title !== 'پرفکت مانی') {
      this.idPay('coin');
    } else {
      this.idPay('vocher');
      this.buyVocher();
    }
  };
  render() {
    const {title, vocher} = this.state;
    const {setting} = this.props;
    const min = parseInt(setting[0]?.Min_Curency);
    const max = parseInt(setting[0]?.Max_Curency);

    return (
      <View style={{justifyContent: 'center', marginHorizontal: '3%'}}>
        <View style={style.logoCon}>
          <Image
            source={images.global.logo}
            style={{
              height: heightPercentageToDP(25),
              width: widthPercentageToDP(35),
            }}
            resizeMode="contain"
          />
        </View>
        <Card>
          <View
            style={{
              flexDirection: 'row-reverse',
              flexWrap: 'nowrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: '3%',
            }}>
            <Text color="green">خرید و فروش ارز های دیجیتال</Text>
            <Text>
              {' '}
              {persianNumber(moment().format('jYYYY/jM/jD hh:mm:ss '))}
            </Text>
          </View>
        </Card>
        <Card style={{padding: '3%'}}>
          <Text> خرید {title} </Text>
          <Text
            style={{fontSize: 12, marginVertical: heightPercentageToDP(2)}}
            color="gray">
            {this.renderDescribe()}
          </Text>
          <Item style={style.item}>
            <Input
              placeholder="مبلغ به ریال"
              placeholderTextColor="#adb4bc"
              style={style.inputStyle}
              keyboardType="phone-pad"
              containerStyle={style.item}
              autoFocus={false}
              blurOnSubmit
              onChangeText={t => this.setState({rial: t})}
            />
          </Item>
        </Card>
        <View style={style.btnView}>
          <Button
            TouchableComponent={TouchableOpacity}
            ViewComponent={LinearGradient} // Don't forget this!
            title={this.state.btn}
            containerStyle={style.shadow}
            buttonStyle={style.btn}
            titleStyle={style.medium}
            linearGradientProps={{
              colors: [
                AppStyles.color.ColorGreen,
                AppStyles.color.ColorGreenFos,
              ],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            onPress={() => this.onSubmit()}
          />
        </View>
        <CustomModal
          isVisible={this.state.dialog1}
          title="مبلغ نادرست"
          describe={persianNumber(`حداقل مبلغ معاملات ${min} ریال می باشد `)}
          onConfirm={() => {
            this.setState({dialog1: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog2}
          title="مبلغ نادرست"
          describe={persianNumber(`حداکثر مبلغ معاملات ${max} ریال می باشد `)}
          onConfirm={() => {
            this.setState({dialog2: false});
          }}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  setting: state.setting.items,
  //dollar: state.dollar.items,
  error: state.prices.error,
});

export default connect(mapStateToProps)(PayScreen);
const style = StyleSheet.create({
  logoCon: {alignItems: 'center'},
  btn: {borderRadius: normalize(25), paddingVertical: heightPercentageToDP(1)},
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
  btnView: {
    marginHorizontal: widthPercentageToDP(10),
    marginTop: normalize(20, 'height'),
  },
  item: {
    alignSelf: 'center',
    marginBottom: '3%',
    borderColor: AppStyles.color.ColorGreen,
  },
  inputStyle: {
    fontFamily: 'IRANSansMobile',
    textAlign: 'right',
    paddingBottom: heightPercentageToDP(0.8),
  },
});
