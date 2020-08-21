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
import HTML from 'react-native-render-html';
import {
  IGNORED_TAGS,
  alterNode,
  makeTableRenderer,
} from 'react-native-render-html-table-bridge';
import WebView from 'react-native-webview';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
const config = {
  WebViewComponent: WebView,
};

const renderers = {
  table: makeTableRenderer(config),
};

const htmlConfig = {
  alterNode,
  renderers,
  ignoredTags: IGNORED_TAGS,
};
class ArzScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: '',
      btn: 'ثبت شناسه تراکنش',
      name: '',
      id: '',
      phone: '',
      mail: '',
      dialog1: false,
      dollar: [],
      vocher: '',
      number: '',
      code: '',
      tran: [],
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
    this.props.navigation.getParam('wallet');
    this.setState({
      wallet: this.props.navigation.getParam('wallet'),
    });
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');
    const phone = await AsyncStorage.getItem('phone');
    const mail = await AsyncStorage.getItem('mail');
    this.setState({name: name});
    this.setState({id: id});
    this.setState({phone: phone});
    this.setState({mail: mail});
    fetch(
      'https://jimbooexchange.com/php_api/get_transaction_by_user_id_and_user_name.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
        body: `Id=${id}&User_Name=${name}`,
      },
    )
      .then(response => response.json()) //   <------ this line
      .then(response => {
        return this.setState({tran: response.data});
      });
  }

  render() {
    const {title, vocher, wallet} = this.state;
    const {setting, navigation} = this.props;
    const min = parseInt(setting[0]?.Min_Curency);
    const max = parseInt(setting[0]?.Max_Curency);
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
            تراکنش یا همان txid خود و یا itc (بایننس) را ثبت نماید
          </Text>

          <Text>
            آدرس کیف پول{JSON.stringify(navigation.getParam('title'))}
          </Text>
          <Item style={style.item}>
            <Input
              placeholder="e-voucher"
              placeholderTextColor="#adb4bc"
              style={style.inputStyle}
              //keyboardType="phone-pad"
              containerStyle={style.item}
              autoFocus={false}
              blurOnSubmit
              value={this.state.wallet}
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
            onPress={() => navigation.navigate('Arz2')}
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
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  setting: state.setting.items,
  //dollar: state.dollar.items,
  error: state.prices.error,
});

export default connect(mapStateToProps)(ArzScreen);
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
