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
      menu2: 24,
      rial: '',
      arz: '',
      numb: '',
      name: '',
      id: '',
      phone: '',
      mail: '',
      link: '',
      btcN: null,
      bchN: null,
      xrpN: null,
      xmrN: null,
      trxN: null,
      ltcN: null,
      ethN: null,
      dogeN: null,
      dashN: null,
      bnbN: null,
      adaN: null,
      xlmN: null,
      linkSN: null,
      miotaN: null,
      neoN: null,
      zecN: null,
      yfiN: null,
      yfiiN: null,
      sxpN: null,
      usdtN: null,
      btc: null,
      bch: null,
      xrp: null,
      xmr: null,
      trx: null,
      ltc: null,
      eth: null,
      doge: null,
      dash: null,
      bnb: null,
      ada: null,
      xlm: null,
      linkS: null,
      miota: null,
      neo: null,
      zec: null,
      yfi: null,
      yfii: null,
      sxp: null,
      usdt: null,
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
    const {prices} = this.props;
    const btc = prices.find(({symbol}) => symbol === 'btc');
    this.setState({btc: JSON.parse(parseFloat(btc.current_price))});
    this.setState({btcN: JSON.stringify(btc.name)});
    const bch = prices.find(({symbol}) => symbol === 'bch');
    this.setState({bch: JSON.parse(parseFloat(bch.current_price))});
    this.setState({bchN: JSON.stringify(bch.name)});
    const xrp = prices.find(({symbol}) => symbol === 'xrp');
    this.setState({xrp: JSON.parse(parseFloat(xrp.current_price))});
    this.setState({xrpN: JSON.stringify(xrp.name)});
    const xmr = prices.find(({symbol}) => symbol === 'xmr');
    this.setState({xmr: JSON.parse(parseFloat(xmr.current_price))});
    this.setState({xmrN: JSON.stringify(xmr.name)});
    const trx = prices.find(({symbol}) => symbol === 'trx');
    this.setState({trx: JSON.parse(parseFloat(trx.current_price))});
    this.setState({trxN: JSON.stringify(trx.name)});
    const ltc = prices.find(({symbol}) => symbol === 'ltc');
    this.setState({ltc: JSON.parse(parseFloat(ltc.current_price))});
    this.setState({ltcN: JSON.stringify(ltc.name)});
    const eth = prices.find(({symbol}) => symbol === 'eth');
    this.setState({eth: JSON.parse(parseFloat(eth.current_price))});
    this.setState({ethN: JSON.stringify(eth.name)});
    const doge = prices.find(({symbol}) => symbol === 'doge');
    this.setState({doge: JSON.parse(parseFloat(doge.current_price))});
    this.setState({dogeN: JSON.stringify(doge.name)});
    const dash = prices.find(({symbol}) => symbol === 'dash');
    this.setState({dash: JSON.parse(parseFloat(dash.current_price))});
    this.setState({dashN: JSON.stringify(dash.name)});
    const bnb = prices.find(({symbol}) => symbol === 'bnb');
    this.setState({bnb: JSON.parse(parseFloat(bnb.current_price))});
    this.setState({bnbN: JSON.stringify(bnb.name)});
    const ada = prices.find(({symbol}) => symbol === 'ada');
    this.setState({ada: JSON.parse(parseFloat(ada.current_price))});
    this.setState({adaN: JSON.stringify(ada.name)});
    const xlm = prices.find(({name}) => name === 'Stellar');
    this.setState({xlm: JSON.parse(parseFloat(xlm.current_price))});
    this.setState({xlmN: JSON.stringify(xlm.name)});
    const linkS = prices.find(({symbol}) => symbol === 'link');
    this.setState({linkS: JSON.parse(parseFloat(linkS.current_price))});
    this.setState({linkSN: JSON.stringify(linkS.name)});
    const miota = prices.find(({symbol}) => symbol === 'miota');
    this.setState({miota: JSON.parse(parseFloat(miota.current_price))});
    this.setState({miotaN: JSON.stringify(miota.name)});
    const neo = prices.find(({symbol}) => symbol === 'neo');
    this.setState({neo: JSON.parse(parseFloat(neo.current_price))});
    this.setState({neoN: JSON.stringify(neo.name)});
    const zec = prices.find(({symbol}) => symbol === 'zec');
    this.setState({zec: JSON.parse(parseFloat(zec.current_price))});
    this.setState({zecN: JSON.stringify(zec.name)});
    const yfi = prices.find(({symbol}) => symbol === 'yfi');
    this.setState({yfi: JSON.parse(parseFloat(yfi.current_price))});
    this.setState({yfiN: JSON.stringify(yfi.name)});
    const yfii = prices.find(({symbol}) => symbol === 'yfii');
    this.setState({yfii: JSON.parse(parseFloat(yfii.current_price))});
    this.setState({yfiiN: JSON.stringify(yfii.name)});
    const sxp = prices.find(({symbol}) => symbol === 'sxp');
    this.setState({sxp: JSON.parse(parseFloat(sxp.current_price))});
    this.setState({sxpN: JSON.stringify(sxp.name)});
    const usdt = prices.find(({symbol}) => symbol === 'usdt');
    this.setState({usdt: JSON.parse(parseFloat(usdt.current_price))});
    this.setState({usdtN: JSON.stringify(usdt.name)});
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
        return '(BTC) بیت کوین';
      case 2:
        return '(BCH) بیت کوین کش';
      case 3:
        return '(XRP) ریبل';
      case 4:
        return '(TRX) ترون';
      case 5:
        return '(LTC) لایت کوین';
      case 6:
        return '(ETH) اتریوم';
      case 7:
        return '(DASH) دش کوین';
      case 8:
        return '(XMR) مونرو';
      case 9:
        return ' (DOGE) داج کوین';
      case 10:
        return '(ADA) کاردانو';
      case 11:
        return '(XLM) استلار';
      case 12:
        return '(LINK) چین لینک';
      case 13:
        return ' (BNB) کوین بایننس';
      case 14:
        return '(IOTA) آیوتا';
      case 15:
        return '(NEO) نئو';
      case 16:
        return '(YFI) یرن فایننس';
      case 17:
        return '(YFII) یرن فایننس';
      case 18:
        return '(ZEC) زی کش';
      case 19:
        return '(SXP) سوایپ';
      case 20:
        return ' (USDT)(ERC20) تتر';
      case 21:
        return '(USDT)(OMNI) تتر';
      case 22:
        return '(USDT)(TRC20) تتر';
      case 23:
        return '(PM) پرفکت مانی';
      case 24:
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
    const {setting, navigation, prices} = this.props;
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
    const {
      btcN,
      bchN,
      xrpN,
      xmrN,
      trxN,
      ltcN,
      ethN,
      dogeN,
      dashN,
      bnbN,
      adaN,
      xlmN,
      linkSN,
      miotaN,
      neoN,
      zecN,
      yfiN,
      yfiiN,
      sxpN,
      usdtN,
    } = this.state;
    switch (this.state.menu2) {
      case 1:
        return btcN;
      case 2:
        return bchN;
      case 3:
        return xrpN;
      case 4:
        return trxN;
      case 5:
        return ltcN;
      case 6:
        return ethN;
      case 7:
        return dashN;
      case 8:
        return xmrN;
      case 9:
        return dogeN;
      case 10:
        return adaN;
      case 11:
        return xlmN;
      case 12:
        return linkSN;
      case 13:
        return bnbN;
      case 14:
        return miotaN;
      case 15:
        return neoN;
      case 16:
        return yfiN;
      case 17:
        return yfiiN;
      case 18:
        return zecN;
      case 19:
        return sxpN;
      case 20:
        return usdtN;
      case 21:
        return usdtN;
      case 22:
        return usdtN;
      case 23:
        return 'Perfect Money';
      case 24:
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
        return images.example.monro;
      case 9:
        return images.example.doge;
      case 10:
        return images.example.cardano;
      case 11:
        return images.example.staller;
      case 12:
        return images.example.chainlink;
      case 13:
        return images.example.binance;
      case 14:
        return images.example.iota;
      case 15:
        return images.example.neo;
      case 16:
        return images.example.yfi;
      case 17:
        return images.example.yfii;
      case 18:
        return images.example.zcash;
      case 19:
        return images.example.sxp;
      case 20:
        return images.example.tether;
      case 21:
        return images.example.tether;
      case 22:
        return images.example.tether;
      case 23:
        return images.example.pm;
      case 24:
        return images.example.Rial;
    }
  };
  renderTitle = () => {
    switch (this.state.menu) {
      case 1:
        return '(BTC) بیت کوین';
      case 2:
        return '(BCH) بیت کوین کش';
      case 3:
        return '(XRP) ریبل';
      case 4:
        return '(TRX) ترون';
      case 5:
        return '(LTC) لایت کوین';
      case 6:
        return '(ETH) اتریوم';
      case 7:
        return '(DASH) دش کوین';
      case 8:
        return '(XMR) مونرو';
      case 9:
        return ' (DOGE) داج کوین';
      case 10:
        return '(ADA) کاردانو';
      case 11:
        return '(XLM) استلار';
      case 12:
        return '(LINK) چین لینک';
      case 13:
        return ' (BNB) کوین بایننس';
      case 14:
        return '(IOTA) آیوتا';
      case 15:
        return '(NEO) نئو';
      case 16:
        return '(YFI) یرن فایننس';
      case 17:
        return '(YFII) یرن فایننس';
      case 18:
        return '(ZEC) زی کش';
      case 19:
        return '(SXP) سوایپ';
      case 20:
        return ' (USDT)(ERC20) تتر';
      case 21:
        return '(USDT)(OMNI) تتر';
      case 22:
        return '(USDT)(TRC20) تتر';
      case 23:
        return '(PM) پرفکت مانی';
      case 24:
        return 'تومان';
    }
  };
  renderSubTitle = () => {
    const {
      btcN,
      bchN,
      xrpN,
      xmrN,
      trxN,
      ltcN,
      ethN,
      dogeN,
      dashN,
      bnbN,
      adaN,
      xlmN,
      linkSN,
      miotaN,
      neoN,
      zecN,
      yfiN,
      yfiiN,
      sxpN,
      usdtN,
    } = this.state;
    switch (this.state.menu) {
      case 1:
        return btcN;
      case 2:
        return bchN;
      case 3:
        return xrpN;
      case 4:
        return trxN;
      case 5:
        return ltcN;
      case 6:
        return ethN;
      case 7:
        return dashN;
      case 8:
        return xmrN;
      case 9:
        return dogeN;
      case 10:
        return adaN;
      case 11:
        return xlmN;
      case 12:
        return linkSN;
      case 13:
        return bnbN;
      case 14:
        return miotaN;
      case 15:
        return neoN;
      case 16:
        return yfiN;
      case 17:
        return yfiiN;
      case 18:
        return zecN;
      case 19:
        return sxpN;
      case 20:
        return usdtN;
      case 21:
        return usdtN;
      case 22:
        return usdtN;
      case 23:
        return 'Perfect Money';
      case 24:
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
        return images.example.monro;
      case 9:
        return images.example.doge;
      case 10:
        return images.example.cardano;
      case 11:
        return images.example.staller;
      case 12:
        return images.example.chainlink;
      case 13:
        return images.example.binance;
      case 14:
        return images.example.iota;
      case 15:
        return images.example.neo;
      case 16:
        return images.example.yfi;
      case 17:
        return images.example.yfii;
      case 18:
        return images.example.zcash;
      case 19:
        return images.example.sxp;
      case 20:
        return images.example.tether;
      case 21:
        return images.example.tether;
      case 22:
        return images.example.tether;
      case 23:
        return images.example.pm;
      case 24:
        return images.example.Rial;
    }
  };
  renderCurrent = () => {
    const {
      btc,
      bch,
      xrp,
      xmr,
      trx,
      ltc,
      eth,
      doge,
      dash,
      bnb,
      ada,
      xlm,
      linkS,
      miota,
      neo,
      zec,
      yfi,
      yfii,
      sxp,
      usdt,
    } = this.state;
    switch (this.state.menu) {
      case 1:
        return btc;
      case 2:
        return bch;
      case 3:
        return xrp;
      case 4:
        return trx;
      case 5:
        return ltc;
      case 6:
        return eth;
      case 7:
        return dash;
      case 8:
        return xmr;
      case 9:
        return doge;
      case 10:
        return ada;
      case 11:
        return xlm;
      case 12:
        return linkS;
      case 13:
        return bnb;
      case 14:
        return miota;
      case 15:
        return neo;
      case 16:
        return yfi;
      case 17:
        return yfii;
      case 18:
        return zec;
      case 19:
        return sxp;
      case 20:
        return usdt;
      case 21:
        return usdt;
      case 22:
        return usdt;
      case 23:
        return;
      case 24:
        return;
    }
  };
  renderCurrent2 = () => {
    const {
      btc,
      bch,
      xrp,
      xmr,
      trx,
      ltc,
      eth,
      doge,
      dash,
      bnb,
      ada,
      xlm,
      linkS,
      miota,
      neo,
      zec,
      yfi,
      yfii,
      sxp,
      usdt,
    } = this.state;
    switch (this.state.menu2) {
      case 1:
        return btc;
      case 2:
        return bch;
      case 3:
        return xrp;
      case 4:
        return trx;
      case 5:
        return ltc;
      case 6:
        return eth;
      case 7:
        return dash;
      case 8:
        return xmr;
      case 9:
        return doge;
      case 10:
        return ada;
      case 11:
        return xlm;
      case 12:
        return linkS;
      case 13:
        return bnb;
      case 14:
        return miota;
      case 15:
        return neo;
      case 16:
        return yfi;
      case 17:
        return yfii;
      case 18:
        return zec;
      case 19:
        return sxp;
      case 20:
        return usdt;
      case 21:
        return usdt;
      case 22:
        return usdt;
      case 23:
        return 1;
      case 24:
        return;
    }
  };
  renderRial = () => {
    const {
      btc,
      bch,
      xrp,
      xmr,
      trx,
      ltc,
      eth,
      doge,
      dash,
      bnb,
      ada,
      xlm,
      linkS,
      miota,
      neo,
      zec,
      yfi,
      yfii,
      sxp,
      usdt,
    } = this.state;
    const {prices, setting} = this.props;
    const d = parseFloat(setting[0]?.Defrent);
    const p = parseFloat(setting[0]?.PerfectCost);
    //const p = parseInt(dollar?.sana_buy_usd?.p);
    const def = parseFloat(setting[0]?.Defrent);
    const vd = setting[0]?.vocher_defrens;
    switch (this.state.menu) {
      case 1:
        return Math.abs((btc * def) / 10);
      case 2:
        return Math.abs((bch * def) / 10);
      case 3:
        return Math.abs((xrp * def) / 10);
      case 4:
        return Math.abs((trx * def) / 10);
      case 5:
        return Math.abs((ltc * def) / 10);
      case 6:
        return Math.abs((eth * def) / 10);
      case 7:
        return Math.abs((dash * def) / 10);
      case 8:
        return Math.abs((xmr * def) / 10);
      case 9:
        return Math.abs((doge * def) / 10);
      case 10:
        return Math.abs((ada * def) / 10);
      case 11:
        return Math.abs((xlm * def) / 10);
      case 12:
        return Math.abs((linkS * def) / 10);
      case 13:
        return Math.abs((bnb * def) / 10);
      case 14:
        return Math.abs((miota * def) / 10);
      case 15:
        return Math.abs((neo * def) / 10);
      case 16:
        return Math.abs((yfi * def) / 10);
      case 17:
        return Math.abs((yfii * def) / 10);
      case 18:
        return Math.abs((zec * def) / 10);
      case 19:
        return Math.abs((sxp * def) / 10);
      case 20:
        return Math.abs((usdt * def) / 10);
      case 21:
        return Math.abs((usdt * def) / 10);
      case 22:
        return Math.abs((usdt * def) / 10);

      case 23:
        return Math.abs(p / 10);
      case 24:
        return 1;
    }
  };
  renderRial2 = () => {
    const {
      btc,
      bch,
      xrp,
      xmr,
      trx,
      ltc,
      eth,
      doge,
      dash,
      bnb,
      ada,
      xlm,
      linkS,
      miota,
      neo,
      zec,
      yfi,
      yfii,
      sxp,
      usdt,
    } = this.state;
    const {prices, setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const p = parseInt(setting[0]?.PerfectCost);
    const vd = parseInt(setting[0]?.vocher_defrens);
    const cd = parseInt(setting[0]?.Coin_defrens);

    const def = parseInt(setting[0]?.Defrent);
    switch (this.state.menu2) {
      case 1:
        return Math.abs((btc * def * cd) / 10);
      case 2:
        return Math.abs((bch * def * cd) / 10);
      case 3:
        return Math.abs((xrp * def * cd) / 10);
      case 4:
        return Math.abs((trx * def * cd) / 10);
      case 5:
        return Math.abs((ltc * def * cd) / 10);
      case 6:
        return Math.abs((eth * def * cd) / 10);
      case 7:
        return Math.abs((dash * def * cd) / 10);
      case 8:
        return Math.abs((xmr * def * cd) / 10);
      case 9:
        return Math.abs((doge * def * cd) / 10);
      case 10:
        return Math.abs((ada * def * cd) / 10);
      case 11:
        return Math.abs((xlm * def * cd) / 10);
      case 12:
        return Math.abs((linkS * def * cd) / 10);
      case 13:
        return Math.abs((bnb * def * cd) / 10);
      case 14:
        return Math.abs((miota * def * cd) / 10);
      case 15:
        return Math.abs((neo * def * cd) / 10);
      case 16:
        return Math.abs((yfi * def * cd) / 10);
      case 17:
        return Math.abs((yfii * def * cd) / 10);
      case 18:
        return Math.abs((zec * def * cd) / 10);
      case 19:
        return Math.abs((sxp * def * cd) / 10);
      case 20:
        return Math.abs((usdt * def * cd) / 10);
      case 21:
        return Math.abs((usdt * def * cd) / 10);
      case 22:
        return Math.abs((usdt * def * cd) / 10);
      case 23:
        return Math.abs(p * vd) / 10;
      case 24:
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
        return 'BTC';
      case 9:
        return 'DOGE';
      case 10:
        return 'ADA';
      case 11:
        return 'XLM';
      case 12:
        return 'LINK';
      case 13:
        return 'BNB';
      case 14:
        return 'IOTA';
      case 15:
        return 'NEO';
      case 16:
        return 'YFI';
      case 17:
        return 'YFII';
      case 18:
        return 'ZEC';
      case 19:
        return 'SXP';
      case 20:
        return 'USDT';
      case 21:
        return 'USDT';
      case 22:
        return 'USDT';
      case 23:
        return 'PM';
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
        return 'BTC';
      case 9:
        return 'DOGE';
      case 10:
        return 'ADA';
      case 11:
        return 'XLM';
      case 12:
        return 'LINK';
      case 13:
        return 'BNB';
      case 14:
        return 'IOTA';
      case 15:
        return 'NEO';
      case 16:
        return 'YFI';
      case 17:
        return 'YFII';
      case 18:
        return 'ZEC';
      case 19:
        return 'SXP';
      case 20:
        return 'USDT';
      case 21:
        return 'USDT';
      case 22:
        return 'USDT';
      case 23:
        return 'PM';
    }
  };
  render() {
    const {dollar} = this.state;
    const {loading, prices, setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const url = setting[0]?.Telegram_link;
    const p = parseInt(dollar?.sana_buy_usd?.p);
    const def = Math.abs(d);
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
                      <View
                        style={{
                          marginRight: wp(3.5),
                          marginLeft: wp(3.5),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
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
                            <Text style={style.menuTxt}>بیت کوین(BTC)</Text>
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
                            <Text style={style.menuTxt}>بیت کوین کش(BCH)</Text>
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
                            <Text style={style.menuTxt}>ریبل(XRP)</Text>
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
                            <Text style={style.menuTxt}>ترون(TRX)</Text>
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
                            <Text style={style.menuTxt}>لایت کوین(LTC)</Text>
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
                            <Text style={style.menuTxt}>اتریوم(ETH)</Text>
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
                            <Text style={style.menuTxt}>دش کوین(DASH)</Text>
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
                            <Text style={style.menuTxt}>مونرو(XMR)</Text>
                          </View>
                          <Image
                            source={images.example.monro}
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
                            <Text style={style.menuTxt}>داج کوین(DOGE)</Text>
                          </View>
                          <Image
                            source={images.example.doge}
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
                            if (this.renderTitle() !== 'تومان') {
                              this.setState({dialog2: true});
                            }
                          }}
                          style={style.menuItem}>
                          <View>
                            <Text style={style.menuTxt}>کاردانو(ADA)</Text>
                          </View>
                          <Image
                            source={images.example.cardano}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 11,
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
                            <Text style={style.menuTxt}>استلار(XLM)</Text>
                          </View>
                          <Image
                            source={images.example.staller}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 12,
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
                            <Text style={style.menuTxt}>چین لینک(LINK)</Text>
                          </View>
                          <Image
                            source={images.example.chainlink}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 13,
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
                            <Text style={style.menuTxt}>کوین بایننس(BNB)</Text>
                          </View>
                          <Image
                            source={images.example.binance}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 14,
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
                            <Text style={style.menuTxt}>آیوتا(IOTA)</Text>
                          </View>
                          <Image
                            source={images.example.iota}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 15,
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
                            <Text style={style.menuTxt}>نئو(NEO)</Text>
                          </View>
                          <Image
                            source={images.example.neo}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 16,
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
                            <Text style={style.menuTxt}>یرن فایننس(YFI)</Text>
                          </View>
                          <Image
                            source={images.example.yfi}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 17,
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
                            <Text style={style.menuTxt}>یرن فایننس(YFII)</Text>
                          </View>
                          <Image
                            source={images.example.yfii}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 18,
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
                            <Text style={style.menuTxt}>زی کش(ZEC)</Text>
                          </View>
                          <Image
                            source={images.example.zcash}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 19,
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
                            <Text style={style.menuTxt}>سوایپ(SXP)</Text>
                          </View>
                          <Image
                            source={images.example.sxp}
                            style={style.imageMenu}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                        <MenuDivider />
                        <TouchableOpacity
                          onPress={() => {
                            this.setState({
                              menu2: 20,
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
                            <Text style={style.menuTxt}>تتر(USDT)(ERC20) </Text>
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
                              menu2: 21,
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
                            <Text style={style.menuTxt}>تتر(USDT)(OMNI)</Text>
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
                              menu2: 22,
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
                            <Text style={style.menuTxt}>تتر(USDT)(TRC20) </Text>
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
                              menu2: 23,
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
                            <Text style={style.menuTxt}>پرفکت مانی(PM)</Text>
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
                              menu2: 24,
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
                    <View
                      style={{
                        marginRight: wp(3),
                        marginLeft: wp(3),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={[style2.grayTxt, {marginRight: wp(2)}]}>
                        {this.renderTitle()}
                      </Text>
                      <Text style={style2.grayTxt}>
                        {this.renderSubTitle()}
                      </Text>
                    </View>
                    <Menu
                      style={{marginTop: hp(2)}}
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
                          <Text style={style.menuTxt}>بیت کوین(BTC) </Text>
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
                          <Text style={style.menuTxt}>بیت کوین کش(BCH)</Text>
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
                          <Text style={style.menuTxt}>ریبل(XRP)</Text>
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
                          <Text style={style.menuTxt}>ترون(TRX)</Text>
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
                          <Text style={style.menuTxt}>لایت کوین(LTC)</Text>
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
                          <Text style={style.menuTxt}>اتریوم(ETH)</Text>
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
                          <Text style={style.menuTxt}>دش کوین(DASH)</Text>
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
                            clearInput: '',
                            clearInput2: '',
                            menu: 8,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>مونرو(XMR) </Text>
                        </View>
                        <Image
                          source={images.example.monro}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 9,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>داج کوین(DOGE) </Text>
                        </View>
                        <Image
                          source={images.example.doge}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 10,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>کاردانو(ADA) </Text>
                        </View>
                        <Image
                          source={images.example.cardano}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 11,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>استلار(XLM) </Text>
                        </View>
                        <Image
                          source={images.example.staller}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 12,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>چین لینک(LINK) </Text>
                        </View>
                        <Image
                          source={images.example.chainlink}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 13,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>کوین بایننس(BNB) </Text>
                        </View>
                        <Image
                          source={images.example.binance}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 14,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>آیوتا(IOTA) </Text>
                        </View>
                        <Image
                          source={images.example.iota}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 15,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>نئو(NEO) </Text>
                        </View>
                        <Image
                          source={images.example.neo}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 16,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>یرن فایننس(YFI) </Text>
                        </View>
                        <Image
                          source={images.example.yfi}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 17,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>یرن فایننس(YFII) </Text>
                        </View>
                        <Image
                          source={images.example.yfii}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 18,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>زی کش(ZEC) </Text>
                        </View>
                        <Image
                          source={images.example.zcash}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 19,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>سوایپ(SXP) </Text>
                        </View>
                        <Image
                          source={images.example.sxp}
                          style={style.imageMenu}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <MenuDivider />
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            clearInput: '',
                            clearInput2: '',
                            menu: 20,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>تتر(USDT)(ERC20) </Text>
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
                            clearInput: '',
                            clearInput2: '',
                            menu: 21,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>تتر(USDT)(OMNI) </Text>
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
                            clearInput: '',
                            clearInput2: '',
                            menu: 22,
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>تتر(USDT)(TRC20) </Text>
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
                            menu: 23,
                            clearInput: '',
                            clearInput2: '',
                          });
                          this.hideMenu();
                        }}
                        style={style.menuItem}>
                        <View>
                          <Text style={style.menuTxt}>پرفکت مانی(PM) </Text>
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
                            menu: 24,
                            clearInput: '',
                            clearInput2: '',
                            menu2: 1,
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
  grayTxt: {color: styles.color.colorText_GrAY, fontSize: normalize(14)},
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
  imageMenu: {width: wp(5), height: hp(2.5)},
  menuTxt: {fontSize: normalize(13)},
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
    fontSize: normalize(11),
  },
});
