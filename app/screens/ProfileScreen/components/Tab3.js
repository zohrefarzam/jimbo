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
import styles from '../../../config/styles';
import {Text} from '../../../utils/Kit';
import LinearGradient from 'react-native-linear-gradient';
import CustomModal from '../../../components/CustomModal';
import images from '../../../config/images';
import {persianNumber} from '../../../lib/persian';
let data = [
  {
    value: 'بانک ملی ایران',
  },
  {
    value: 'بانک سپه',
  },
  {
    value: 'بانک توسعه صادرات',
  },
  {
    value: 'بانک صنعت و معدن',
  },
  {
    value: 'بانک کشاورزی',
  },
  {
    value: 'بانک مسکن',
  },
  {
    value: 'پست بانک ایران',
  },
  {
    value: 'بانک توسعه تعاون',
  },
  {
    value: 'بانک اقتصاد نوین',
  },
  {
    value: 'ملّی ایران',
  },
  {
    value: 'بانک پارسیان',
  },
  {
    value: 'بانک پاسارگاد',
  },
  {
    value: 'بانک کارآفرین',
  },
  {
    value: 'بانک سامان',
  },
  {
    value: 'بانک سینا',
  },
  {
    value: 'بانک سرمایه',
  },
  {
    value: 'بانک آینده',
  },
  {
    value: 'بانک شهر',
  },
  {
    value: 'بانک دی',
  },
  {
    value: 'بانک صادرات',
  },
  {
    value: 'بانک ملت',
  },
  {
    value: 'بانک تجارت',
  },
  {
    value: 'بانک رفاه',
  },
  {
    value: 'بانک انصار',
  },
  {
    value: 'بانک مهر اقتصاد',
  },
];

export default class Tab3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog1: false,
      dialog2: false,
      Bank: '',
      ShabaNum: '',
      name: '',
      id: '',
      data: {},
      check: '',
      loading: false,
      dialog3: false,
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
  updateBank = Bank => this.setState({Bank: Bank.value});
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
  renderBankImage = Bank => {
    switch (Bank) {
      case 'بانک ملی ایران':
        return images.bank.meli;
      case 'بانک سپه':
        return images.bank.sepah;
      case 'بانک توسعه صادرات':
        return images.bank.tosee;
      case 'بانک صنعت و معدن':
        return images.bank.sanaat;
      case 'بانک کشاورزی':
        return images.bank.keshvarzi;
      case 'بانک مسکن':
        return images.bank.maskan;
      case 'پست بانک ایران':
        return images.bank.post;
      case 'بانک توسعه تعاون':
        return images.bank.tosee;
      case 'بانک اقتصاد نوین':
        return images.bank.eghtesad;
      case 'بانک پارسیان':
        return images.bank.parsian;
      case 'بانک پاسارگاد':
        return images.bank.pasar;
      case 'بانک کارآفرین':
        return images.bank.karafarin;
      case 'بانک سامان':
        return images.bank.saman;
      case 'بانک سینا':
        return images.bank.sina;
      case 'بانک سرمایه':
        return images.bank.sarmaye;
      case 'بانک آینده':
        return images.bank.tat;
      case 'بانک شهر':
        return images.bank.shahr;
      case 'بانک دی':
        return images.bank.day;
      case 'بانک صادرات':
        return images.bank.saderat;
      case 'بانک ملت':
        return images.bank.mellat;
      case 'بانک تجارت':
        return images.bank.tejarat;
      case 'بانک رفاه':
        return images.bank.refah;
      case 'بانک انصار':
        return images.bank.ansar;
      case 'بانک مهر اقتصاد':
        return images.bank.mehr;
      default:
        break;
    }
  };
  renderBankId = () => {
    const {Bank} = this.state;
    switch (Bank) {
      case 'بانک ملی ایران':
        return 603799;
      case 'بانک سپه':
        return 589210;
      case 'بانک توسعه صادرات':
        return 627648;
      case 627961:
        return 'بانک صنعت و معدن';
      case 'بانک کشاورزی':
        return 603770;
      case 'بانک مسکن':
        return 628023;
      case 'پست بانک ایران':
        return 627760;
      case 'بانک توسعه تعاون':
        return 502908;
      case 'بانک اقتصاد نوین':
        return 627412;
      case 'بانک پارسیان':
        return 622106;
      case 'بانک پاسارگاد':
        return 502229;
      case 'بانک کارآفرین':
        return 627488;
      case 'بانک سامان':
        return 621986;
      case 'بانک سینا':
        return 639346;
      case 'بانک سرمایه':
        return 639607;
      case 'بانک آینده':
        return 636214;
      case 'بانک شهر':
        return 502806;
      case 'بانک دی':
        return 502938;
      case 'بانک صادرات':
        return 603769;
      case 'بانک ملت':
        return 610433;
      case 'بانک تجارت':
        return 585983;
      case 'بانک رفاه':
        return 589463;
      case 'بانک انصار':
        return 627381;
      case 'بانک مهر اقتصاد':
        return 639370;
      default:
        break;
    }
  };
  loadingData = () => {
    const {name, id} = this.state;
    fetch(
      'https://jimbooexchange.com/php_api/get_shaba_by_user_id_and_user_name.php',
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
  Add = () => {
    const {Bank, ShabaNum, name, id} = this.state;
    if (!/[IR]/g.test(ShabaNum) || /[d d]/g.test(ShabaNum)) {
      this.setState({dialog2: true});
    } else {
      fetch('https://jimbooexchange.com/php_api/insert_shaba.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        },
        body: `Bank_Name=${Bank}&Shaba_Num=${ShabaNum}&User_Name=${name}&User_Id=${id}&Bank_Id=${this.renderBankId()}`, // <-- Post parameters
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
    this.setState({dialog3: false});
    fetch('https://jimbooexchange.com/php_api/delete_shaba.php', {
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
            برای فروش ارز باید یک شماره شبا به نام خودتان ثبت نمایید.
          </Text>
          <View style={{marginTop: hp(3), marginHorizontal: wp(25)}}>
            <Button
              TouchableComponent={TouchableOpacity}
              ViewComponent={LinearGradient} // Don't forget this!
              title="ثبت شبا جدید"
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
                      source={this.renderBankImage(item.Bank_Name)}
                      style={{height: hp(5), width: wp(5), flex: 0.2}}
                      resizeMode="contain"
                    />

                    <Numb
                      onLongPress={() => showToast()}
                      style={[
                        style.txt,
                        {fontSize: normalize(14), marginLeft: wp(2)},
                      ]}
                      selectable>
                      {item.Shaba_Num}
                    </Numb>

                    <Text size="norm" style={[style.txt, {flex: 0.4}]}>
                      {this.renderCheck(item.Is_Ok)}
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
        </View>
        <CustomModal
          isVisible={this.state.dialog1}
          onConfirm={() => this.Add()}
          title="افزودن شماره شبای جدید"
          picker
          data={data}
          value={this.state.Bank}
          onChangeSelect={this.updateBank}
          input
          onChangeText={r => this.setState({ShabaNum: r})}
        />
        <CustomModal
          isVisible={this.state.dialog2}
          onConfirm={() => this.setState({dialog2: false})}
          title="خطا در وارد کردن اطلاعات"
          describe="شماره شبا را به همراه IR و بدون فاصله وارد نمایید"
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
          describe="شماره شبا شما حذف شود؟ این عملیات غیر قابل برگشت است."
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
  img: {height: hp(3.5), width: wp(3.5)},
});
