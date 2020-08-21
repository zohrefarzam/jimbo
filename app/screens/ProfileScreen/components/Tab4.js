import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Text as Numb,
  ToastAndroid,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../config/styles';
import {Text} from '../../../utils/Kit';
import normalize from 'react-native-normalize';
import CustomModal from '../../../components/CustomModal';
import {persianNumber} from '../../../lib/persian';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../../config/images';
import {Content} from 'native-base';
export default class Tab4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog1: false,
      dialog3: false,
      delete: '',
      bankNum: '',
      bankName: '',
      name: '',
      id: '',
      loading: true,
      data: {},
      check: '',
    };
  }
  loadingData = () => {
    const {id, name} = this.state;
    fetch(
      'https://jimbooexchange.com/php_api/get_creadit_card_by_user_id_and_user_name.php',
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
  async componentWillMount() {
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');
    this.setState({name: name});
    this.setState({id: id});
    this.loadingData();
  }
  renderCheck = check => {
    switch (check) {
      case 'wait':
        return 'درحال بررسی';
      case 'yes':
        return 'تایید شده';

      default:
        break;
    }
  };
  renderBankImage = bankNum => {
    const Six = Math.abs(bankNum.slice(0, 6));
    switch (Six) {
      case 603799:
        return images.bank.meli;
      case 589210:
        return images.bank.sepah;
      case 627648:
        return images.bank.tosee;
      case 627961:
        return images.bank.sanaat;
      case 603770:
        return images.bank.keshvarzi;
      case 628023:
        return images.bank.maskan;
      case 627760:
        return images.bank.post;
      case 502908:
        return images.bank.tosee;
      case 627412:
        return images.bank.eghtesad;
      case 622106:
        return images.bank.parsian;
      case 502229:
        return images.bank.pasar;
      case 627488:
        return images.bank.karafarin;
      case 621986:
        return images.bank.saman;
      case 639346:
        return images.bank.sina;
      case 639607:
        return images.bank.sarmaye;
      case 636214:
        return images.bank.tat;
      case 502806:
        return images.bank.shahr;
      case 502938:
        return images.bank.day;
      case 603769:
        return images.bank.saderat;
      case 610433:
        return images.bank.mellat;
      case 585983:
        return images.bank.tejarat;
      case 589463:
        return images.bank.refah;
      case 627381:
        return images.bank.ansar;
      case 639370:
        return images.bank.mehr;
      default:
        break;
    }
  };
  renderBankName = () => {
    const {bankNum} = this.state;
    const Six = Math.abs(bankNum.slice(0, 6));
    switch (Six) {
      case 603799:
        return 'بانک ملی ایران';
      case 589210:
        return 'بانک سپه';
      case 627648:
        return 'بانک توسعه صادرات';
      case 627961:
        return 'بانک صنعت و معدن';
      case 603770:
        return 'بانک کشاورزی';
      case 628023:
        return 'بانک مسکن';
      case 627760:
        return 'پست بانک ایران';
      case 502908:
        return 'بانک توسعه تعاون';
      case 627412:
        return 'بانک اقتصاد نوین';
      case 622106:
        return 'بانک پارسیان';
      case 502229:
        return 'بانک پاسارگاد';
      case 627488:
        return 'بانک کارآفرین';
      case 621986:
        return 'بانک سامان';
      case 639346:
        return 'بانک سینا';
      case 639607:
        return 'بانک سرمایه';
      case 636214:
        return 'بانک آینده';
      case 502806:
        return 'بانک شهر';
      case 502938:
        return 'بانک دی';
      case 603769:
        return 'بانک صادرات';
      case 610433:
        return 'بانک ملت';
      case 585983:
        return 'بانک تجارت';
      case 589463:
        return 'بانک رفاه';
      case 627381:
        return 'بانک انصار';
      case 639370:
        return 'بانک مهر اقتصاد';
      default:
        break;
    }
  };
  Add = () => {
    this.setState({loading: true});
    fetch('https://jimbooexchange.com/php_api/insert_creadit_card.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: `Bank_Name=${this.renderBankName()}&Card_Num=${
        this.state.bankNum
      }&User_Name=${this.state.name}&User_Id=${this.state.id}`, // <-- Post parameters
    }).finally(() => {
      this.loadingData();
      this.setState({loading: false});
      this.setState({dialog1: false});
    });
  };
  onDelete = Id => {
    this.setState({dialog3: true});
    this.setState({delete: Id});
  };
  Delete = () => {
    this.setState({loading: true});
    this.setState({dialog3: false});
    fetch('https://jimbooexchange.com/php_api/delete_cart.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: `Id=${this.state.delete}`, // <-- Post parameters
    }).finally(() => {
      this.loadingData();
      this.setState({loading: false});
    });
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
            {' '}
            برای خرید ارز باید یک کارت بانکی به نام خودتان ثبت کنید.{' '}
          </Text>
          <View style={{marginTop: hp(3), marginHorizontal: wp(25)}}>
            <Button
              TouchableComponent={TouchableOpacity}
              ViewComponent={LinearGradient} // Don't forget this!
              title="ثبت کارت جدید"
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
                      source={this.renderBankImage(item.Card_Num)}
                      style={{height: hp(5), width: wp(5), flex: 0.2}}
                      resizeMode="contain"
                    />

                    <Numb
                      onLongPress={() => showToast()}
                      style={[style.txt, {fontSize: normalize(14), flex: 0.6}]}
                      selectable>
                      {item.Card_Num}
                    </Numb>

                    <Text
                      size="norm"
                      style={[style.txt, {flex: 0.5, marginRight: wp(13)}]}>
                      {this.renderCheck(item.IsOk)}
                    </Text>
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
          <CustomModal
            isVisible={this.state.dialog1}
            title="وارد کردن شماره کارت"
            input
            onChangeText={t => this.setState({bankNum: t})}
            onConfirm={() => this.Add()}
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
            describe="شماره کارت شما حذف شود؟ این عملیات غیر قابل برگشت است."
          />
        </View>
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
    height: hp(6.5),
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
