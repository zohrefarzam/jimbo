import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Clipboard,
  Text as Numb,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from '../../../utils/Kit';
import {persianNumber} from '../../../lib/persian';
import {Content} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import normalize from 'react-native-normalize';
import styles from '../../../config/styles';
export default class Tab6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      btn: 'ثبت شناسه تراکنش',
      loading: true,
      name: '',
      id: '',
      phone: '',
      mail: '',
      dialog1: false,
      number: '',
      code: '',
      data: {},
      text: '',
    };
  }
  async componentWillMount() {
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');
    this.setState({name: name});
    this.setState({id: id});
    fetch(
      'https://jimbooexchange.com/php_api/get_transaction_by_user_id_and_user_name.php',
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
      })
      .catch(error => console.error(error));
  }
  render() {
    const renderCode = text => {
      var myArray = text.split(`<br>`);
      return myArray[0];
    };
    const renderCode3 = text => {
      var myArray = text.split(`<br>`);

      return myArray[1];
    };
    const renderCode4 = text => {
      var myArray = text.split(`<br>`);

      return myArray[2];
    };
    const showToast = () => {
      setTimeout(() => {
        ToastAndroid.show('کپی شد!', ToastAndroid.LONG);
      }, 3000);
    };
    return (
      <View style={styles.container}>
        <View
          style={[
            style.view2,
            {
              borderColor: styles.color.COLOR_DARK_SEPERATOR,
            },
          ]}>
          <Text
            style={[
              style.txt,
              {flex: 0.15, alignItems: 'center', justifyContent: 'center'},
            ]}>
            ردیف
          </Text>
          <Text
            style={[
              style.txt,
              {flex: 0.35, alignItems: 'center', justifyContent: 'center'},
            ]}>
            مبلغ تراکنش
          </Text>
          <Text
            style={[
              style.txt,
              {flex: 0.4, alignItems: 'center', justifyContent: 'center'},
            ]}>
            شماره پیگیری
          </Text>
          <Text
            style={[
              style.txt,
              {flex: 0.4, alignItems: 'center', justifyContent: 'center'},
            ]}>
            تاریخ وساعت
          </Text>
          <Text
            style={[
              style.txt,
              {flex: 0.4, alignItems: 'center', justifyContent: 'center'},
            ]}>
            بابت
          </Text>
        </View>
        <Content style={{marginTop: hp(1)}}>
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
                  <Text style={[style.txt, {flex: 0.1}]} size="norm">
                    {persianNumber(index + 1)}
                  </Text>

                  <Text
                    style={[
                      style.txt,
                      {fontSize: normalize(12), flex: 0.35, marginRight: wp(2)},
                    ]}
                    size="norm">
                    {persianNumber(item.Cost)}
                  </Text>
                  <View
                    style={{
                      flex: 0.6,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: wp(2),
                      marginTop: hp(4),
                    }}>
                    <Numb
                      onLongPress={() => showToast()}
                      selectable
                      style={[style.txt]}>
                      {renderCode(item.Code)}
                    </Numb>
                    <Numb
                      onLongPress={() => showToast()}
                      style={[style.txt]}
                      selectable>
                      {renderCode3(item.Code)}
                    </Numb>
                    <Numb
                      onLongPress={() => showToast()}
                      style={[style.txt]}
                      selectable>
                      {renderCode4(item.Code)}
                    </Numb>
                  </View>
                  <Text size="norm" style={[style.txt, {flex: 0.4}]}>
                    {item.Time}
                  </Text>
                  <Text style={[style.txt, {flex: 0.7}]}>{item.Reason}</Text>
                </View>
              )}
            />
          )}
        </Content>
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
    height: hp(25),
    marginBottom: hp(2),
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    marginHorizontal: wp(3),
  },
  view2: {
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
    marginHorizontal: wp(3),
  },
  txt: {
    //color: styles.color.colorText_GrAY,
    fontSize: normalize(13),
  },
  img: {height: hp(3), width: wp(3), flex: 0.3},
});
