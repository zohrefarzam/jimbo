import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
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
class Arz2Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      btn: 'ثبت شناسه تراکنش',
      name: '',
      id: '',
      phone: '',
      mail: '',
      dialog1: false,
      number: '',
      code: '',
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
    this.setState({name: name});
    this.setState({id: id});
  }
  onSubmit = () => {
    const {number, code, name, id} = this.state;
    const date = persianNumber(moment().format('jYYYY/jM/jD hh:mm:ss '));
    fetch('https://jimbooexchange.com/php_api/insert_transaction.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: `Code=${code}&Time=${date}&Reason=${`خرید ارز دیجیتال:${number}`}&Cost=${'نامعلوم'}&User_Name=${name}&User_Id=${id}`,
    })
      .then(function(json) {
        console.log('request succeeded with json response', json);
      })
      .catch(function(error) {
        console.log('request failed', error);
      });
    this.setState({dialog1: true});
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{marginHorizontal: '3%'}}>
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
          <Text
            style={{fontSize: 12, marginVertical: heightPercentageToDP(2)}}
            color="gray">
            تعیین قیمت نهایی زمانی است که شناسه تراکنش کاربر در شبکه بلاکچین
            کانفرم می‌شود. کاربر پس از واریز ارز به کیف پول جیمبو باید شناسه
            تراکنش یا همان txid خود و یا itc (بایننس) را ثبت نماید. پس از ثبت
            مبلغ دقیق محاسبه و در کمتر از 48 ساعت با استفاده از شماره شبا وجه
            معادل واریز خواهد شد.
          </Text>
          <Text>شناسه تراکنش</Text>
          <Item style={style.item}>
            <Input
              placeholder="Transaction Id(txid)or Internal Transfer Code for Binance"
              placeholderTextColor="#adb4bc"
              style={style.inputStyle}
              //keyboardType="phone-pad"
              containerStyle={style.item}
              autoFocus={false}
              blurOnSubmit
              onChangeText={t => this.setState({code: t})}
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
          title="ثبت موفق بود"
          describe="اطلاعات پرداخت شما ثبت شد"
          onConfirm={() => {
            this.setState({dialog1: false});
          }}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  setting: state.setting.items,
  //dollar: state.dollar.items,
  error: state.prices.error,
});

export default connect(mapStateToProps)(Arz2Screen);
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
    fontSize: normalize(14),
    fontFamily: 'IRANSansMobile',
    textAlign: 'right',
    paddingBottom: heightPercentageToDP(0.8),
  },
});
