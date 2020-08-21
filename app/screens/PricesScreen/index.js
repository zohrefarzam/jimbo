import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import normalize from 'react-native-normalize';
import {Text, TextNumber} from '../../utils/Kit';
import styles from '../../config/styles';
import images from '../../config/images';
import {connect} from 'react-redux';
import {FetchPrices, FetchSetting} from '../../api/methods/FetchPrices';

class PricesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {dollar: []};
  }

  componentWillMount() {
    this.props.dispatch(FetchPrices());
    this.props.dispatch(FetchSetting());
    // this.props.dispatch(FetchDollar());
    fetch('https://api.tgju.online/v1/data/sana/json')
      .then(response => response.json())
      .then(json => {
        this.setState({dollar: json});
      })
      .catch(error => console.error(error));
  }

  render() {
    const {dollar} = this.state;
    const {loading, prices, setting} = this.props;
    const d = parseInt(setting[0]?.Defrent);
    const p = parseInt(dollar?.sana_buy_usd?.p);
    //alert(prices[0]?.name);
    return (
      <View style={style.main}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={images.global.logo}
            style={{height: hp(15), width: wp(35)}}
            resizeMode="contain"
          />
        </View>
        <View style={style.mh}>
          <View style={style.view1}>
            <View style={style.view2}>
              <Text style={[style.txt, {flex: 1.6}]}>قیمت به دلار</Text>
              <Text style={[style.txt, {flex: 1.7}]}>قیمت به ریال</Text>
              <Text style={style.txt}>نماد ارز</Text>
              <Text style={style.txt}>نام ارز</Text>
              <Text style={[style.txt, {flex: 0.7}]}>تصویر</Text>
            </View>
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={prices}
              keyExtractor={({id}, index) => id}
              renderItem={({item, index}) => (
                <View
                  style={[
                    style2.view1,
                    {height:hp(8.5),
                      padding:5,
                      borderColor:
                        index % 2 === 0
                          ? styles.color.colorText_GrAY
                          : styles.color.COLOR_DARK_SEPERATOR,
                    },
                  ]}>
                  <Text style={style2.txt}>
                    <TextNumber dollor>{item.current_price}</TextNumber>
                  </Text>
                  <Text style={style2.txt}>
                    <TextNumber>
                      {Math.abs((p + d) * item.current_price)}
                    </TextNumber>
                  </Text>
                  <Text style={[style2.txt, {flex: 0.5}]}>{item.symbol}</Text>
                  <Text style={[style2.txt, {flex: 0.8}]}>{item.name}</Text>
                  <Image
                    source={{uri: `${item.image}`}}
                    style={style2.img}
                    resizeMode="contain"
                  />
                </View>
              )}
            />
          )}
        </View>
      </View>
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

export default connect(mapStateToProps)(PricesScreen);

const style = StyleSheet.create({
  main: {backgroundColor: 'white', flex: 1},
  title: {
    color: styles.color.colorText_GrAY,
    fontSize: normalize(30),
    alignSelf: 'center',
    marginTop: hp(2),
    marginBottom: hp(3),
  },
  mh: {marginHorizontal: wp(2)},
  view1: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 45,
    height: hp(8.5),
    marginVertical: hp(2),
    justifyContent: 'center',
    paddingHorizontal: wp(1),
  },
  view2: {
    borderRadius: 45,
    backgroundColor: styles.color.ColorGray,
    height: hp(6.7),
    paddingHorizontal: wp(2),
    //margin: 5,
    //marginBottom:normalize(15,'height') ,
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'white',
    height: hp(6.5),
    paddingRight: wp(5),
    borderColor: styles.color.COLOR_DARK_SEPERATOR,
    borderWidth: 2,
    elevation: 1,
  },
  input: {fontFamily: 'IRANSansMobile', fontSize: normalize(14)},
  img: {height: hp(6), width: wp(6)},
  txt: {
    color: styles.color.colorText_GrAY,
    // paddingHorizontal: normalize(10),
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    fontSize: normalize(14),
  },
});
const style2 = StyleSheet.create({
  view1: {
    borderWidth: 2,
    borderColor: styles.color.COLOR_DARK_SEPERATOR,
    borderRadius: 45,
    height: hp(8.5),
    marginBottom: hp(2),
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  txt: {
    color: styles.color.colorText_GrAY,
    flex: 1,
    fontSize: normalize(14),
  },
  img: {height: hp(8), width: wp(8)},
});
