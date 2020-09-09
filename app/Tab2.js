import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Text as Numb,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Content} from 'native-base';
import {Button} from 'react-native-elements';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../config/styles';
import {Text} from '../../../utils/Kit';
import CustomModal from '../../../components/CustomModal';
import images from '../../../config/images';
import {persianNumber} from '../../../lib/persian';
let data = [
  {
    value: '(BTC) بیت کوین',
  },
  {
    value: '(BCH) بیت کوین کش',
  },
  {
    value: '(ZEC) زی کش',
  },
  {
    value: '(XRP) ریبل',
  },
  {
    value: '(XLM) استلار',
  },
  {
    value: '(TRX) ترون',
  },
  {
    value: '(XMR) مونرو',
  },
  {
    value: '(LTC) لایت کوین',
  },
  {
    value: '(ETH) اتریوم',
  },
  {
    value: '(DOGE) داج کوین',
  },
  {
    value: '(DASH) دش کوین',
  },
  {
    value: '(ADA) کاردانو',
  },
  {
    value: '(LINK) چین لینک',
  },
  {
    value: '(BNB) کوین بایننس',
  },
  {
    value: '(IOTA) آیوتا',
  },
  {
    value: '(NEO) نئو',
  },
  {
    value: '(YFI) یرن فایننس',
  },
  {
    value: '(YFII) یرن فایننس',
  },
  {
    value: '(SXP) سوایپ',
  },
  {
    value: '(USDT)(ERC20) تتر',
  },
  {
    value: '(USDT)(OMNI) تتر',
  },
  {
    value: '(USDT)(TRC20) تتر',
  },
];

export default class Tab2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      wallet: '',
      code: '',
      digital: '',
      name: '',
      id: '',
      data: {},
      check: '',
      symbol: '',
      delete: '',
    };
  }
  async componentWillMount() {
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');
    this.setState({name: name});
    this.setState({id: id});
    this.loadingData();
  }
  loadingData = () => {
    const {id, name} = this.state;
    fetch(
      'https://jimbooexchange.com/php_api/get_wallet_by_user_id_and_user_name.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
        body: `Id=${id}&User_Name=${name}`, // <-- Post parameters
      },
    )
      .then(res => res.json())
      .then(json => {
        this.setState({data: json.data});
        this.setState({loading: false});
      });
  };
  updateBank = digital => this.setState({digital: digital.value});
  renderWalletImage = digital => {
    switch (digital) {
      case '(BTC) بیت کوین':
        return images.example.bit;
      case '(BCH) بیت کوین کش':
        return images.example.bitcoinC;
      case '(ZEC) زی کش':
        return images.example.zcash;
      case '(XRP) ریبل':
        return images.example.xrp;
      case '(XLM) استلار':
        return images.example.staller;
      case '(TRX) ترون':
        return images.example.tron;
      case '(XMR) مونرو':
        return images.example.monro;
      case '(LTC) لایت کوین':
        return images.example.litecoin;
      case '(ETH) اتریوم':
        return images.example.ethereum;
      case '(DOGE) داج کوین':
        return images.example.doge;
      case '(DASH) دش کوین':
        return images.example.dash;
      case '(ADA) کاردانو':
        return images.example.cardano;
      case '(LINK) چین لینک':
        return images.example.chainlink;
      case '(BNB) کوین بایننس':
        return images.example.binance;
      case '(IOTA) آیوتا':
        return images.example.iota;
      case '(NEO) نئو':
        return images.example.neo;
      case '(YFI) یرن فایننس':
        return images.example.yfi;
      case '(YFII) یرن فایننس':
        return images.example.yfii;
      case '(SXP) سوایپ':
        return images.example.sxp;
      case '(USDT)(ERC20) تتر':
        return images.example.tether;
      case '(USDT)(OMNI) تتر':
        return images.example.tether;
      case '(USDT)(TRC20) تتر':
        return images.example.tether;
      default:
        break;
    }
  };
  renderWallet = () => {
    const {digital} = this.state;
    switch (digital) {
      case '(BTC) بیت کوین':
        return 'btc';
      case 'بیت کوین کش':
        return 'bch';
      case '(ZEC) زی کش':
        return 'zec';
      case '(XRP) ریبل':
        return 'xrp';
      case '(XLM) استلار':
        return 'xlm';
      case '(TRX) ترون':
        return 'trx';
      case '(XMR) مونرو':
        return 'xmr';
      case '(LTC) لایت کوین':
        return 'ltc';
      case '(ETH) اتریوم':
        return 'eth';
      case '(DOGE) داج کوین':
        return 'doge';
      case '(DASH) دش کوین':
        return 'dash';
      case '(ADA) کاردانو':
        return 'ada';
      case '(LINK) چین لینک':
        return 'link';
      case '(BNB) کوین بایننس':
        return 'bnb';
      case '(IOTA) آیوتا':
        return 'miota';
      case '(NEO) نئو':
        return 'neo';
      case '(YFI) یرن فایننس':
        return 'yfi';
      case '(YFII) یرن فایننس':
        return 'yfii';
      case '(SXP) سوایپ':
        return 'sxp';
      case '(USDT)(ERC20) تتر':
        return 'usdt';
      case '(USDT)(OMNI) تتر':
        return 'usdt';
      case '(USDT)(TRC20) تتر':
        return 'usdt';
      default:
        break;
    }
  };

  Add = () => {
    const {wallet, code, digital, name, id} = this.state;
    if (wallet.length === 0 || code.length === 0) {
      this.setState({dialog2: true});
    } else {
      fetch('https://jimbooexchange.com/php_api/insert_wallet.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
        body: `Wallet_Name=${digital}&Wallet_Coin=${this.renderWallet()}&Wallet_Lable=${wallet}&Wallet_Code=${code}&User_Name=${name}&User_Id=${id}`, // <-- Post parameters
      }).finally(() => {
        this.loadingData();
        this.setState({loading: false});
        this.setState({dialog1: false});
      });
    }
  };
  onDelete = Id => {
    this.setState({dialog3: true});
    this.setState({delete: Id});
  };
  Delete = () => {
    fetch('https://jimbooexchange.com/php_api/delete_wallet.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: `Id=${this.state.delete}`, // <-- Post parameters
    }).finally(() => {
      this.loadingData();
      this.setState({loading: false});
    });
    this.setState({dialog3: false});
  };
  render() {
    const showToast = () => {
      setTimeout(() => {
        ToastAndroid.show('کپی شد!', ToastAndroid.LONG);
      }, 3000);
    };
    return (
      <View style={{flex: 1}}>
        <View style={{marginVertical: hp(2), marginHorizontal: wp(5)}}>
          <Text size="norm">
            برای خرید ارز باید آدرس کیف پول خود را ثبت نمایید.
          </Text>
          <View style={{marginTop: hp(3), marginHorizontal: wp(25)}}>
            <Button
              TouchableComponent={TouchableOpacity}
              ViewComponent={LinearGradient} // Don't forget this!
              title="ثبت کیف پول جدید"
              containerStyle={style.shadow}
              buttonStyle={style.btn}
              titleStyle={style.medium}
              linearGradientProps={{
                colors: [styles.color.ColorGreen, styles.color.ColorGreenFos],
                start: {x: 0, y: 0.5},
                end: {x: 1, y: 0.5},
              }}
              onPress={() => this.setState({dialog1: true})}
            />
          </View>
          <Content style={{marginTop: hp(7)}}>
            {this.state.loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                removeClippedSubviews={false}
                data={this.state.data}
                keyExtractor={({id}, index) => id}
                renderItem={({item, index}) => (
                  <View
                    style={[
                      style.view1,
                      {
                        borderColor:
                          index % 2 === 0
                            ? styles.color.colorText_GrAY
                            : styles.color.COLOR_DARK_SEPERATOR,
                      },
                    ]}>
                    <Image
                      source={this.renderWalletImage(item.Wallet_Name)}
                      style={style.img}
                      resizeMode="contain"
                    />
                    <Numb
                      onLongPress={() => showToast()}
                      selectable
                      style={[
                        style.txt,
                        {fontSize: normalize(12), paddingRight: 10},
                      ]}>
                      نام کیف پول : {item.Wallet_Lable}
                    </Numb>
                    <Numb
                      onLongPress={() => showToast()}
                      selectable
                      style={[
                        style.txt,
                        {fontSize: normalize(12), marginLeft: wp(3)},
                      ]}>
                      <Text>کد کیف پول :</Text> {item.Wallet_Code}
                    </Numb>
                    <TouchableOpacity onPress={() => this.onDelete(item.Id)}>
                      <Image
                        source={images.global.delete}
                        style={style.img}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </Content>
        </View>
        <CustomModal
          isVisible={this.state.dialog1}
          onConfirm={() => this.Add()}
          title="افزودن کیف پول"
          picker
          data={data}
          value={this.state.digital}
          onChangeSelect={this.updateBank}
          input
          input2
          place1="نام کیف پول را اینجا وارد کنید"
          place2="کد کیف پول را اینجا وارد کنید"
          onChangeText={r => this.setState({wallet: r})}
          onChangeText2={r => this.setState({code: r})}
        />
        <CustomModal
          isVisible={this.state.dialog2}
          onConfirm={() => this.setState({dialog2: false})}
          title="خطا در وارد کردن اطلاعات"
        />
        <CustomModal
          isVisible={this.state.dialog3}
          onConfirm={() => {
            this.Delete();
          }}
          onCancle={() => this.setState({dialog3: false})}
          cancleTitle="خیر"
          confirmTitle="بله"
          title="حذف شود؟"
          describe="آدرس کیف پول شما حذف شود؟ این عملیات غیر قابل برگشت است."
        />
      </View>
    );
  }
}
const style = StyleSheet.create({
  btn: {borderRadius: 30},
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
  },
  btnView: {marginHorizontal: wp(30), flex: 1},
  view1: {
    backgroundColor: 'white',
    borderWidth: 2,
    // borderColor: 'gray',
    borderRadius: 25,
    height: hp(7.5),
    marginBottom: hp(2),
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  txt: {
    //color: styles.color.colorText_GrAY,
    flex: 1.2,
  },
  img: {height: hp(3.5), width: wp(3.5), flex: 0.4},
});
