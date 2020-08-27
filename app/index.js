import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {Button, Avatar} from 'react-native-elements';
import normalize from 'react-native-normalize';
import {Text, numberWithCommas} from '../../utils/Kit';
import styles from '../../config/styles';
import Menu, {MenuDivider} from 'react-native-material-menu';
import {TextNumber} from '../../utils/Kit';
import {connect} from 'react-redux';
import {FetchPrices, FetchSetting} from '../../api/methods/FetchPrices';
import images from '../../config/images';
import {persianNumber, latinNumber} from '../../lib/persian';
import {Input} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import CustomModal from '../../components/CustomModal';
class BuyingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dollar: [],
      menu: 1,
      menu2: 10,
      rial: '',
      arz: '',
      numb: '',
      name: '',
      id: '',
      phone: '',
      mail: '',
      link: '',
      wallet: false,
      dialog1: false,
      dialog3: false,
      dialog2: false,
      dialog5: false,
      dialog6: false,
      shaba: [],
      clearInput: '',
      clearInput2: '',
    };
  }
  state = {
    visible: false,
    dialogVisible: false,
  };
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };
  _menu2 = null;

  setMenuRef2 = ref2 => {
    this._menu2 = ref2;
  };

  hideMenu2 = () => {
    this._menu2.hide();
  };

  showMenu2 = () => {
    this._menu2.show();
  };
  async componentWillMount() {
    this.props.dispatch(FetchPrices());
    this.props.dispatch(FetchSetting());
    // this.props.dispatch(FetchDollar());
    fetch('https://api.tgju.online/v1/data/sana/json')
      .then(response => response.json())
      .then(json => {
        this.setState({dollar: json});
      })
      .catch(error => console.error(error));
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');
    const phone = await AsyncStorage.getItem('phone');
    const mail = await AsyncStorage.getItem('mail');
    this.setState({name: name});
    this.setState({id: id});
    this.setState({phone: phone});
    this.setState({mail: mail});
    await fetch(
      'https://jimbooexchange.com/php_api/get_wallet_by_user_id_and_user_name.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
        body: `Id=${id}&User_Name=${name}`, // <-- Post parameters
      },
    )
      .then(response => response.json()) //   <------ this line
      .then(response => {
        return this.setState({wallet: response.data});
      });
    await fetch(
      'https://jimbooexchange.com/php_api/get_shaba_by_user_id_and_user_name.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
        body: `Id=${id}&User_Name=${name}`, // <-- Post parameters
      },
    )
      .then(response => response.json()) //   <------ this line
      .then(response => {
        return this.setState({shaba: response.data});
      });
  }

  renderTitle2 = () => {
    switch (this.state.menu2) {
      case 1:
        return 'بیت کوین';
      case 2:
        return 'بیت کوین کش';
      case 3:
        return 'ریپل';
      case 4:
        return 'ترون';
      case 5:
        return 'لایت کوین ';
      case 6:
        return 'اتریوم';
      case 7:
        return 'دش کوین';
      case 8:
        return 'تتر';
      case 9:
        return 'پرفکت مانی';
      case 10:
        return 'تومان';
    }
  };
  idPay = () => {
    const {name, id, phone, mail, rial} = this.state;
    const rand = Math.floor(Math.random() * 10000) + 1;
    fetch(
      `https://jimbooexchange.com/php_api/idpey_webservice_mob.pWallet_Namet=${rial}&usname=${name}&uid=${id}&kind=coin&mail=${mail}&phone=${phone}&order_id=${rand}&value=${this.renderTitle()}`,
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

  submitBuying = () => {
    const {name, id, phone, mail, rial, wallet, shaba} = this.state;
    const {setting, navigation} = this.props;
    const ress = shaba.find(({Is_Ok}) => Is_Ok === 'yes');
    const result = wallet.filter(({Wallet_Name}) =>
      Wallet_Name.includes(this.renderTitle()),
    );
    const code = result[0]?.Wallet_Code;
    const result2 = wallet.filter(({Wallet_Name}) =>
      Wallet_Name.includes(this.renderTitle2()),
    );
    const bc = setting[0]?.Buy_coin;
    const bv = setting[0]?.Boy_Vocher;
    const code2 = result2[0]?.Wallet_Code;
    const wall2 = result2[0]?.Wallet_Name;
    if (phone === null) {
      this.setState({dialog1: true});
      return;
    } else if (
      this.renderTitle() !== 'پرفکت مانی' &&
      this.renderTitle() !== 'تومان' &&
      bc === 'no'
    ) {
      this.setState({dialog5: true});
    } else if (
      this.renderTitle() !== 'پرفکت مانی' &&
      this.renderTitle() !== 'تومان' &&
      code === undefined
    ) {
      this.setState({dialog3: true});
    } else if (
      this.renderTitle() !== 'پرفکت مانی' &&
      this.renderTitle() !== 'تومان' &&
      ress === undefined
    ) {
      this.setState({dialog6: true});
    } else if (
      this.renderTitle() !== 'پرفکت مانی' &&
      this.renderTitle() !== 'تومان' &&
      ress !== undefined &&
      code !== undefined &&
      bc === 'yes'
    ) {
      navigation.navigate('Pay', {title: this.renderTitle()});
    }
    //  else if (this.renderTitle() !== 'تومان') {
    //   const bc = setting[0]?.Buy_coin;
    //   const bv = setting[0]?.Boy_Vocher;
    if (this.renderTitle() === 'پرفکت مانی') {
      switch (bv) {
        case 'no':
          return this.setState({dialog5: true});
        case 'yes':
          navigation.navigate('Pay', {title: this.renderTitle()});
          break;
      }
    }
    //   } else {
    //     switch (bc) {
    //       case 'no':
    //         return this.setState({dialog5: true});
    //       case 'yes':
    //         navigation.navigate('Pay', {title: this.renderTitle()});
    //         break;
    //     }
    //   }
    // }

    if (
      this.renderTitle() === 'تومان' &&
      this.renderTitle2() === 'پرفکت مانی'
    ) {
      const sv = setting[0]?.Sell_Vocher;
      switch (sv) {
        case 'no':
          return this.setState({dialog5: true});
        case 'yes':
          navigation.navigate('Paying');

        default:
          break;
      }
    }

    if (
      this.renderTitle() === 'تومان' &&
      this.renderTitle2() !== 'پرفکت مانی'
    ) {
      const sc = setting[0]?.Sell_coin;
      switch (sc) {
        case 'no':
          return this.setState({dialog5: true});

        case 'yes': {
          if (
            this.renderTitle() === 'تومان' &&
            (this.renderTitle2() !== 'پرفکت مانی') & (code2 === undefined)
          ) {
            this.setState({dialog3: true});
          } else if (
            this.renderTitle() !== 'پرفکت مانی' &&
            this.renderTitle2() !== 'تومان' &&
            code2 === undefined
          ) {
            this.setState({dialog3: true});
          } else if (
            this.renderTitle() !== 'پرفکت مانی' &&
            this.renderTitle2() !== 'تومان' &&
            ress === undefined
          ) {
            this.setState({dialog6: true});
          } else if (
            this.renderTitle() === 'تومان' &&
            (this.renderTitle2() !== 'پرفکت مانی') &
              (code2 !== undefined) &
              (ress !== undefined)
          ) {
            navigation.navigate('Arz', {
              wallet: code2,
              title: this.renderTitle2(),
            });
          }
        }
        default:
          break;
      }
      //this.setState({dialog3: true});
    }

    // if (this.renderTitle() === 'تومان') {
    //   navigation.navigate('Paying');
    // } else if (this.renderTitle() === 'پرفکت مانی') {
    //   navigation.navigate('Pay', {title: this.renderTitle()});
    // } else {
    //   navigation.navigate('Arz', {wallet: code});
    // }
  };

  renderSubTitle2 = () => {
    const {prices} = this.props;
    switch (this.state.menu2) {
      case 1:
        return prices[0]?.name;
      case 2:
        return prices[4]?.name;
      case 3:
        return prices[3]?.name;
      case 4:
        return prices[16]?.name;
      case 5:
        return prices[7]?.name;
      case 6:
        return prices[1]?.name;
      case 7:
        return prices[25]?.name;
      case 8:
        return prices[2]?.name;
      case 9:
        return 'Perfect Money';
      case 10:
        return 'Toman';
    }
  };
  renderImage2 = () => {
    switch (this.state.menu2) {
      case 1:
        return images.example.bit;
      case 2:
        return images.example.bitcoinC;
      case 3:
        return images.example.xrp;
      case 4:
        return images.example.tron;
      case 5:
        return images.example.litecoin;
      case 6:
        return images.example.ethereum;
      case 7:
        return images.example.dash;
      case 8:
        return images.example.tether;
      case 9:
        return images.example.pm;
      case 10:
        return images.example.Rial;
    }
  };
  renderTitle = () => {
    switch (this.state.menu) {
      case 1:
        return 'بیت کوین';
      case 2:
        return 'بیت کوین کش';
      case 3:
        return 'ریپل';
      case 4:
        return 'ترون';
      case 5:
        return 'لایت کوین ';
      case 6:
        return 'اتریوم';
      case 7:
        return 'دش کوین';
      case 8:
        return 'تتر';
      case 9:
        return 'پرفکت مانی';
      case 10:
        return 'تومان';
    }
  };
  renderSubTitle = () => {
    const {prices} = this.props;
    switch (this.state.menu) {
      case 1:
        return prices[0]?.name;
      case 2:
        return prices[4]?.name;
      case 3:
        return prices[3]?.name;
      case 4:
        return prices[16]?.name;
      case 5:
        return prices[7]?.name;
      case 6:
        return prices[1]?.name;
      case 7:
        return prices[25]?.name;
      case 8:
        return prices[2]?.name;
      case 9:
        return 'Perfect Money';
      case 10:
        return 'Toman';
    }
  };
  renderImage = () => {
    switch (this.state.menu) {
      case 1:
        return images.example.bit;
      case 2:
        return images.example.bitcoinC;
      case 3:
        return images.example.xrp;
      case 4:
        return images.example.tron;
      case 5:
        return images.example.litecoin;
      case 6:
        return images.example.ethereum;
      case 7:
        return images.example.dash;
      case 8:
        return images.example.tether;
      case 9:
        return images.example.pm;
      case 10:
        return images.example.Rial;
    }
  };
  renderCurrent = () => {
    const {prices, setting} = this.props;
    const {dollar} = this.state;
    const d = parseInt(setting[0]?.Defrent);
    const p = parseInt(dollar?.sana_buy_usd?.p);
    const def = Math.abs(d);
    switch (this.state.menu) {
      case 1:
        return prices[0]?.current_price;
      case 2:
        return prices[4]?.current_price;
      case 3:
        return prices[3]?.current_price;
      case 4:
        return prices[16]?.current_price;
      case 5:
        return prices[7]?.current_price;
      case 6:
        return prices[1]?.current_price;
      case 7:
        return prices[25]?.current_price;
      case 8:
        return prices[2]?.current_price;
      case 9:
        return 1;
      case 10:
        return;
    }
  };
  renderCurrent2 = () => {
    const {dollar} = this.state;
    const {prices, setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const p = parseInt(dollar?.sana_buy_usd?.p);
    const def = Math.abs(d);
    switch (this.state.menu2) {
      case 1:
        return prices[0]?.current_price;
      case 2:
        return prices[4]?.current_price;
      case 3:
        return prices[3]?.current_price;
      case 4:
        return prices[16]?.current_price;
      case 5:
        return prices[7]?.current_price;
      case 6:
        return prices[1]?.current_price;
      case 7:
        return prices[25]?.current_price;
      case 8:
        return prices[2]?.current_price;
      case 9:
        return 1;
      case 10:
        return;
    }
  };
  renderRial = () => {
    const {dollar} = this.state;
    const {prices, setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const p = parseInt(dollar?.sana_buy_usd?.p);
    const def = Math.abs(d);
    const vd = setting[0]?.vocher_defrens;
    switch (this.state.menu) {
      case 1:
        return Math.abs((prices[0]?.current_price * def) / 10);
      case 2:
        return Math.abs((prices[4]?.current_price * def) / 10);
      case 3:
        return Math.abs((prices[3]?.current_price * def) / 10);
      case 4:
        return Math.abs((prices[17]?.current_price * def) / 10);
      case 5:
        return Math.abs((prices[7]?.current_price * def) / 10);
      case 6:
        return Math.abs((prices[1]?.current_price * def) / 10);
      case 7:
        return Math.abs((prices[25]?.current_price * def) / 10);
      case 8:
        return Math.abs((prices[2]?.current_price * def) / 10);
      case 9:
        return Math.abs(def / 10);
      case 10:
        return 1;
    }
  };
  renderRial2 = () => {
    const {dollar} = this.state;
    const {prices, setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const p = parseInt(dollar?.sana_buy_usd?.p);
    const vd = setting[0]?.vocher_defrens;
    const def = Math.abs(d);
    switch (this.state.menu2) {
      case 1:
        return Math.abs((prices[0]?.current_price * def) / 10);
      case 2:
        return Math.abs((prices[4]?.current_price * def) / 10);
      case 3:
        return Math.abs((prices[3]?.current_price * def) / 10);
      case 4:
        return Math.abs((prices[17]?.current_price * def) / 10);
      case 5:
        return Math.abs((prices[7]?.current_price * def) / 10);
      case 6:
        return Math.abs((prices[1]?.current_price * def) / 10);
      case 7:
        return Math.abs((prices[25]?.current_price * def) / 10);
      case 8:
        return Math.abs((prices[2]?.current_price * def) / 10);
      case 9:
        return (Math.abs(def * vd) / 10).toFixed();
      case 10:
        return 1;
    }
  };
  renderSymbol = () => {
    switch (this.state.menu) {
      case 1:
        return 'BTC';
      case 2:
        return 'BCH';
      case 3:
        return 'XRP';
      case 4:
        return 'TRX';
      case 5:
        return 'LTC';
      case 6:
        return 'ETH';
      case 7:
        return 'DASH';
      case 8:
        return 'USDT';
      case 9:
        return '$';
    }
  };
  renderSymbol2 = () => {
    switch (this.state.menu2) {
      case 1:
        return 'BTC';
      case 2:
        return 'BCH';
      case 3:
        return 'XRP';
      case 4:
        return 'TRX';
      case 5:
        return 'LTC';
      case 6:
        return 'ETH';
      case 7:
        return 'DASH';
      case 8:
        return 'USDT';
      case 9:
        return '$';
    }
  };
  render() {
    const {dollar} = this.state;
    const {loading, prices, setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const url = setting[0]?.Telegram_link;
    const p = parseInt(dollar?.sana_buy_usd?.p);
    const def = Math.abs(d);
    let first;
    let second;
    return (
      <ScrollView style={style.main}>
        <StatusBar hidden={true} />
        <View style={style.logoCon}>
          <Image
            source={images.global.logo}
            style={{height: hp(20), width: wp(35)}}
            resizeMode="contain"
          />
        </View>
        <View>
          <View>
            <Text
              style={{
                fontSize: normalize(12),
                marginVertical: heightPercentageToDP(1),
                marginRight: '7%',
              }}
              color="gray">
              توجه: اولویت انتخاب با گزینه "دریافت میکنید" میباشد
            </Text>
            <Text
              style={{
                fontSize: normalize(12),
                marginVertical: heightPercentageToDP(1),
                marginRight: '7%',
              }}
              color="gray">
              توجه: نرخ نمایش داده شده بدون محاسبه پورسانت خرید و فروش می باشد
            </Text>
            <View style={style2.main}>
              <View style={style2.card}>
                <View style={style2.titleView}>
                  <Text style={style2.title}>پرداخت میکنید</Text>
                </View>
                {/**
                 *
                 paying
                 */}
                <View style={style2.js}>
                  <View style={[style2.right, {flex: 0.5}]}>
                    <Input
                      style={[style.input]}
                      // ref={()=>this.setState({clearInput:!this.state.clearInput})}
                      value={
                        !this.state.clearInput2
                          ? this.renderTitle2() === 'تومان'
                            ? ` ${persianNumber(
                                numberWithCommas(
                                  String(
                                    Math.abs(
                                      this.state.arz * this.renderRial(),
                                    ),
                                  ).indexOf('.') !== -1
                                    ? +Math.abs(
                                        this.state.arz * this.renderRial(),
                                      ).toPrecision(
                                        String(
                                          Math.abs(
                                            this.state.arz * this.renderRial(),
                                          ),
                                        ).indexOf('.') + 5,
                                      )
                                    : +Math.abs(
                                        this.state.arz * this.renderRial(),
                                      ).toFixed(5),
                                ),
                              )} `
                            : ` ${persianNumber(
                                numberWithCommas(
                                  String(
                                    Math.abs(
                                      this.state.arz / this.renderRial2(),
                                    ),
                                  ).indexOf('.') !== -1
                                    ? +Math.abs(
                                        this.state.arz / this.renderRial2(),
                                      ).toPrecision(
                                        String(
                                          Math.abs(
                                            this.state.arz / this.renderRial2(),
                                          ),
                                        ).indexOf('.') + 5,
                                      )
                                    : +Math.abs(
                                        this.state.arz / this.renderRial2(),
                                      ).toFixed(5),
                                ),
                              )} `
                          : null
                      }
                      onFocus={() => {
                        this.setState({
                          clearInput2: !this.state.clearInput2,
                        });
                        !this.state.clearInput
                          ? this.renderTitle2() === 'تومان'
                            ? ` ${persianNumber(
                                numberWithCommas(
                                  String(
                                    Math.abs(
                                      this.state.rial / this.renderRial(),
                                    ),
                                  ).indexOf('.') !== -1
                                    ? +Math.abs(
                                        this.state.rial / this.renderRial(),
                                      ).toPrecision(
                                        String(
                                          Math.abs(
                                            this.state.rial / this.renderRial(),
                                          ),
                                        ).indexOf('.') + 5,
                                      )
                                    : +Math.abs(
                                        this.state.rial / this.renderRial(),
                                      ).toFixed(5),
                                ),
                              )} `
                            : ` ${persianNumber(
                                numberWithCommas(
                                  String(
                                    Math.abs(
                                      this.state.rial * this.renderRial2(),
                                    ),
                                  ).indexOf('.') !== -1
                                    ? +Math.abs(
                                        this.state.rial * this.renderRial2(),
                                      ).toPrecision(
                                        String(
                                          Math.abs(
                                            this.state.rial *
                                              this.renderRial2(),
                                          ),
                                        ).indexOf('.') + 5,
                                      )
                                    : +Math.abs(
                                        this.state.rial * this.renderRial2(),
                                      ).toFixed(5),
                                ),
                              )} `
                          : null;
                      }}
                      onChange={async () => {
                        this.setState({
                          clearInput: '',
                        });
                        (await this.state.clearInput)
                          ? this.renderTitle2() === 'تومان'
                            ? ` ${persianNumber(
                                numberWithCommas(
                                  String(
                                    Math.abs(
                                      this.state.rial / this.renderRial(),
                                    ),
                                  ).indexOf('.') !== -1
                                    ? +Math.abs(
                                        this.state.rial / this.renderRial(),
                                      ).toPrecision(
                                        String(
                                          Math.abs(
                                            this.state.rial / this.renderRial(),
                                          ),
                                        ).indexOf('.') + 5,
                                      )
                                    : +Math.abs(
                                        this.state.rial / this.renderRial(),
                                      ).toFixed(5),
                                ),
                              )} `
                            : ` ${persianNumber(
                                numberWithCommas(
                                  String(
                                    Math.abs(
                                      this.state.rial * this.renderRial2(),
                                    ),
                                  ).indexOf('.') !== -1
                                    ? +Math.abs(
                                        this.state.rial * this.renderRial2(),
                                      ).toPrecision(
                                        String(
                                          Math.abs(
                                            this.state.rial *
                                              this.renderRial2(),
                                          ),
                                        ).indexOf('.') + 5,
                                      )
                                    : +Math.abs(
                                        this.state.rial * this.renderRial2(),
                                      ).toFixed(5),
                                ),
                              )} `
                          : null;
                      }}
                      onChangeText={t => {
                        this.setState({
                          rial: latinNumber(t),
                        });
                      }}
                      autoFocus={false}
                      multiline={true}
                      keyboardType="numeric"
                    />
                  </View>
                  <TouchableOpacity
                    style={{flex: 0.5}}
                    onPress={this.showMenu2}>
                    <View style={[style2.subView]}>
                      <TouchableOpacity onPress={this.showMenu2}>
                        {this.renderImage2() !== images.example.Rial ? (
                          <Image
                            resizeMode="contain"
                            source={this.renderImage2()}
                            style={{width: wp(6), height: hp(6)}}
                          />
                        ) : (
                          <Image
                            source={this.renderImage2()}
                            style={{width: wp(15), height: hp(6)}}
                          />
                        )}
                      </TouchableOpacity>
                      <View style={{marginRight: wp(3.5), marginLeft: wp(3.5)}}>
                        <Text style={[style2.grayTxt, {marginRight: wp(2)}]}>
                          {this.renderTitle2()}
                        </Text>
                        <Text style={style2.grayTxt}>
                          {this.renderSubTitle2()}
                        </Text>
                      </View>
                      <Menu
                        ref={this.setMenuRef2}
                        button={
                          <TouchableOpacity onPress={this.showMenu2}>
                            <Image
                              resizeMode="contain"
                              source={images.global.arrow_down}
                              style={{width: wp(3), height: hp(3)}}
                            />
                          </TouchableOpacity>
                        }>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 1,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>بیت کوین</Text>
                          </View>
                          <Image
                            source={images.example.bit}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 2,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>بیت کوین کش</Text>
                          </View>
                          <Image
                            source={images.example.bitcoinC}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 3,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>ریبل</Text>
                          </View>
                          <Image
                            source={images.example.xrp}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 4,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>ترون</Text>
                          </View>
                          <Image
                            source={images.example.tron}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 5,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>لایت کوین</Text>
                          </View>
                          <Image
                            source={images.example.litecoin}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 6,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>اتریوم</Text>
                          </View>
                          <Image
                            source={images.example.ethereum}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 7,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>دش کوین</Text>
                          </View>
                          <Image
                            source={images.example.dash}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 8,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>تتر</Text>
                          </View>
                          <Image
                            source={images.example.tether}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 9,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>پرفکت مانی</Text>
                          </View>
                          <Image
                            source={images.example.pm}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 10,
                              clearInput: '',
                              clearInput2: '',
                            });
                            this.hideMenu2();
                            if (this.renderTitle() === 'تومان') {
                              this.setState({dialog4: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>تومان</Text>
                          </View>
                          <Image
                            source={images.example.Rial}
                            style={{
                              height: hp(5.2),
                              width: wp(13),
                              marginRight: -wp(2.5),
                            }}
                          />
                        </TouchableOpacity>
                      </Menu>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={style.txtView}>
          <Text style={[style.grayTxt, style.normal]}>
            <TextNumber black>
              {this.renderTitle2() !== 'تومان'
                ? this.renderCurrent2()
                : this.renderCurrent()}
            </TextNumber>
            <Text style={style.black}>دلار </Text>
            <Text color="gray">نرخ بین المللی ارز </Text>
            <TextNumber size="sm" black>
              {Math.abs(def / 10)}
            </TextNumber>
            قیمت هر دلار
          </Text>
        </View>
        <View>
          <View style={style2.main}>
            <View style={style2.card}>
              <View style={style2.titleView}>
                <Text style={style2.title}>دریافت میکنید</Text>
              </View>
              <View style={style2.js}>
                <View style={[style2.right, {flex: 0.5}]}>
                  <Input
                    style={[style.input]}
                    value={
                      !this.state.clearInput
                        ? this.renderTitle2() === 'تومان'
                          ? ` ${persianNumber(
                              numberWithCommas(
                                String(
                                  Math.abs(this.state.rial / this.renderRial()),
                                ).indexOf('.') !== -1
                                  ? +Math.abs(
                                      this.state.rial / this.renderRial(),
                                    ).toPrecision(
                                      String(
                                        Math.abs(
                                          this.state.rial / this.renderRial(),
                                        ),
                                      ).indexOf('.') + 5,
                                    )
                                  : +Math.abs(
                                      this.state.rial / this.renderRial(),
                                    ).toFixed(5),
                              ),
                            )} `
                          : ` ${persianNumber(
                              numberWithCommas(
                                String(
                                  Math.abs(
                                    this.state.rial * this.renderRial2(),
                                  ),
                                ).indexOf('.') !== -1
                                  ? +Math.abs(
                                      this.state.rial * this.renderRial2(),
                                    ).toPrecision(
                                      String(
                                        Math.abs(
                                          this.state.rial * this.renderRial2(),
                                        ),
                                      ).indexOf('.') + 5,
                                    )
                                  : +Math.abs(
                                      this.state.rial * this.renderRial2(),
                                    ).toFixed(5),
                              ),
                            )} `
                        : null
                    }
                    onChange={async () => {
                      this.setState({
                        clearInput2: '',
                      });
                      (await this.state.clearInput2)
                        ? this.renderTitle2() === 'تومان'
                          ? ` ${persianNumber(
                              numberWithCommas(
                                String(
                                  Math.abs(this.state.arz * this.renderRial()),
                                ).indexOf('.') !== -1
                                  ? +Math.abs(
                                      this.state.arz * this.renderRial(),
                                    ).toPrecision(
                                      String(
                                        Math.abs(
                                          this.state.arz * this.renderRial(),
                                        ),
                                      ).indexOf('.') + 5,
                                    )
                                  : +Math.abs(
                                      this.state.arz * this.renderRial(),
                                    ).toFixed(5),
                              ),
                            )} `
                          : ` ${persianNumber(
                              numberWithCommas(
                                String(
                                  Math.abs(this.state.arz / this.renderRial2()),
                                ).indexOf('.') !== -1
                                  ? +Math.abs(
                                      this.state.arz / this.renderRial2(),
                                    ).toPrecision(
                                      String(
                                        Math.abs(
                                          this.state.arz / this.renderRial2(),
                                        ),
                                      ).indexOf('.') + 5,
                                    )
                                  : +Math.abs(
                                      this.state.arz / this.renderRial2(),
                                    ).toFixed(5),
                              ),
                            )} `
                        : null;
                    }}
                    onFocus={() => {
                      this.setState({
                        clearInput: !this.state.clearInput,
                      });
                    }}
                    onChangeText={t => this.setState({arz: latinNumber(t)})}
                    multiline={true}
                    keyboardType="numeric"
                  />
                </View>
                <TouchableOpacity style={{flex: 0.5}} onPress={this.showMenu}>
                  <View style={style2.subView}>
                    <TouchableOpacity onPress={this.showMenu}>
                      {this.renderImage() !== images.example.Rial ? (
                        <Image
                          resizeMode="contain"
                          source={this.renderImage()}
                          style={{width: wp(6), height: hp(6)}}
                        />
                      ) : (
                        <Image
                          source={this.renderImage()}
                          style={{width: wp(15), height: hp(6)}}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={{marginRight: wp(3), marginLeft: wp(3)}}>
                      <Text style={[style2.grayTxt, {marginRight: wp(2)}]}>
                        {this.renderTitle()}
                      </Text>
                      <Text style={style2.grayTxt}>
                        {this.renderSubTitle()}
                      </Text>
                    </View>
                    <Menu
                      ref={this.setMenuRef}
                      button={
                        <TouchableOpacity onPress={this.showMenu}>
                          <Image
                            resizeMode="contain"
                            source={images.global.arrow_down}
                            style={{width: wp(3.5), height: hp(3.5)}}
                          />
                        </TouchableOpacity>
                      }>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 1,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>بیت کوین</Text>
                        </View>
                        <Image
                          source={images.example.bit}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 2,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                          this.setState({
                            clearInput2: '',
                          });
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>بیت کوین کش</Text>
                        </View>
                        <Image
                          source={images.example.bitcoinC}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 3,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>ریبل</Text>
                        </View>
                        <Image
                          source={images.example.xrp}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 4,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>ترون</Text>
                        </View>
                        <Image
                          source={images.example.tron}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 5,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>لایت کوین</Text>
                        </View>
                        <Image
                          source={images.example.litecoin}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 6,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>اتریوم</Text>
                        </View>
                        <Image
                          source={images.example.ethereum}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 7,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>دش کوین</Text>
                        </View>
                        <Image
                          source={images.example.dash}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 8,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>تتر</Text>
                        </View>
                        <Image
                          source={images.example.tether}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 9,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>پرفکت مانی</Text>
                        </View>
                        <Image
                          source={images.example.pm}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            menu: 10,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>تومان</Text>
                        </View>
                        <Image
                          source={images.example.Rial}
                          style={{
                            height: hp(5.2),
                            width: wp(13),
                            marginRight: -wp(2.5),
                          }}
                        />
                      </TouchableOpacity>
                    </Menu>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={style.center}>
          <View style={style.center}>
            <Text style={[style.grayTxt, style.normal, {paddingBottom: hp(1)}]}>
              قیمت هر واحد
            </Text>
          </View>
          <View style={style.rowRev}>
            <Text style={style.normal}>
              {this.renderTitle2() !== 'تومان'
                ? this.renderSymbol2()
                : this.renderSymbol()}
              1 ={' '}
            </Text>
            <TextNumber style={style.normal}>
              {this.renderTitle2() !== 'تومان'
                ? this.renderRial2()
                : this.renderRial()}
            </TextNumber>
            <Text style={style.normal}>تومان{'  '}</Text>
          </View>
        </View>
        <View style={style.btnView}>
          <Button
            TouchableComponent={TouchableOpacity}
            ViewComponent={LinearGradient} // Don't forget this!
            title="ثبت درخواست"
            //containerStyle={style.shadow}
            buttonStyle={style.btn}
            titleStyle={style.medium}
            linearGradientProps={{
              colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            onPress={() => this.submitBuying()}
          />
        </View>
        <View style={{alignItems: 'center', marginBottom: hp(1)}}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://jimbooexchange.com/')}>
            <Text color="gray">
              ورود به سایت <Text color="green">جیمبو</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <CustomModal
          isVisible={this.state.dialog1}
          title="خطا در ورود اطلاعات"
          describe="ابتدا وارد شوید"
          onConfirm={() => {
            this.props.navigation.navigate('Login');
            this.setState({dialog1: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog2}
          title="پرداخت ارزهای دیجیتال"
          describe="فقط از طریق پرداخت تومانی میتوانید ارزهای دیجیتال تهیه کنید.
          برای این منظور ابتدا فیلد دوم (دریافت میکنید) را روی تومان تنظیم کنید."
          onConfirm={() => {
            this.setState({menu2: 10});
            this.setState({dialog2: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog3}
          title="کیف پول"
          describe="شما هیچ کیف پولی مربوط به ارز دیجیتال مورد نظر ثبت نکرده اید، قبل از خرید باید کیف پول خود را ثبت کنید"
          onConfirm={() => {
            this.setState({dialog3: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog4}
          title="خطا"
          describe="معاملات تومان به تومان امکان ندارد. برای تغییر فروش از ارز دیجیتال به تومان ابتدا فیلد دوم (دریافت میکنید) را روی ارز دیجیتال تنظیم کنید."
          onConfirm={() => {
            this.setState({dialog4: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog5}
          title="اخطار"
          describe="امکان خرید ارزهای دیجیتال فعلا از طریق سایت مقدور نمی باشد. جهت خرید به پشتیبانی تلگرامی ما پیام دهید."
          onConfirm={() => {
            this.setState({dialog5: false});
          }}
        />
        <CustomModal
          isVisible={this.state.dialog6}
          title="شماره شبا"
          describe="شما هیچ شماره شبای تایید شده ای ندارید، اگر شماره شبای خود را ثبت کردید؛ منتظر تأیید از طرف مدیریت باشید و اگر ثبت نکردید ابتدا اقدام به ثبت شماره شبا کنید."
          onConfirm={() => {
            this.setState({dialog6: false});
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: hp(1),
            position: 'absolute',
            left: 5,
            top: hp(12),
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: styles.color.ColorPink,
              alignItems: 'center',
              justifyContent: 'center',
              width: normalize(80, 'width'),
              padding: 2,
            }}
            onPress={() => Linking.openURL(url)}>
            <Avatar
              size="medium"
              source={require('../../assets/images/global/telegram.jpg')}
              rounded
            />
            <Text color="white" style={{fontSize: normalize(12)}}>
              پشتیبانی تلگرامی
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  prices: state.prices.items,
  setting: state.setting.items,
  //dollar: state.dollar.items,
  loading: state.prices.loading,
  error: state.prices.error,
});

export default connect(mapStateToProps)(BuyingScreen);
const style = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: 'iranSans',
    marginRight: wp(5),
  },

  main: {flex: 1, backgroundColor: 'white'},
  logoCon: {alignItems: 'center'},
  title: {color: styles.color.colorText_GrAY, fontSize: normalize(45)},
  grayTxt: {color: styles.color.colorText_GrAY},
  //normal: {fontSize: 16},
  txtView: {marginRight: wp(10), marginVertical: normalize(1, 'height')},
  black: {color: 'black'},
  center: {alignSelf: 'center'},
  rowRev: {flexDirection: 'row-reverse', flexWrap: 'nowrap'},
  btn: {
    borderRadius: normalize(25),
    paddingVertical: hp(1),
    marginBottom: hp(2),
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
  btnView: {marginHorizontal: wp(10), marginTop: normalize(20, 'height')},
  menuItem: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    justifyContent: 'space-between',
  },
  imageMenu: {width: wp(5), height: hp(5)},
});
const style2 = StyleSheet.create({
  main: {marginHorizontal: '5%', padding: 20},
  card: {
    borderColor: styles.color.COLOR_DARK_SEPERATOR,
    borderWidth: 2,
    borderRadius: 10,
  },
  titleView: {
    position: 'absolute',
    zIndex: -1,
    right: wp(2),

    marginTop: -normalize(15, 'height'),
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingLeft: 10,
  },
  title: {
    color: styles.color.colorText_GrAY,
    backgroundColor: 'white',
    fontSize: normalize(14),
  },
  js: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  right: {alignItems: 'flex-end'},
  number: {margin: 20, fontSize: normalize(25), marginVertical: hp()},
  subView: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp(4),
  },
  grayTxt: {
    color: styles.color.colorText_GrAY,
    fontSize: normalize(12),
  },
});
