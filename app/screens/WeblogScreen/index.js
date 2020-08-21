import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import normalize from 'react-native-normalize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-elements';
import {Item, Input} from 'native-base';
import {Text} from '../../utils/Kit';
import styles from '../../config/styles';
import images from '../../config/images';
import {persianNumber} from '../../lib/persian';
import LinearGradient from 'react-native-linear-gradient';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      txt: '',
    };
  }

  componentDidMount() {
    fetch('http://jimbooexchange.com/php_api/get_all_blog.php')
      .then(response => response.json())
      .then(json => {
        this.setState({data: json.data});
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }
  search = () => {
    const {txt} = this.state;
    this.setState({isLoading: true});
    fetch('https://jimbooexchange.com/php_api/search_blog.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: `TXT=${txt}&Kind=${'word'}`, // <-- Post parameters
    })
      .then(response => response.json())
      .then(json => {
        this.setState({data: json.data});
      })
      .finally(() => {
        this.setState({isLoading: false});
      });
  };
  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={{flex: 1, padding: 24}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={images.global.logo}
            style={{height: hp(15), width: wp(35)}}
            resizeMode="contain"
          />
        </View>
        <Item rounded style={style.item}>
          <Input
            placeholderTextColor={styles.color.COLOR_DARK_SEPERATOR}
            placeholder="جستجو"
            multiline={false}
            numberOfLines={1}
            maxLength={11}
            onChangeText={r => this.setState({txt: r})}
            style={style.input}
          />
          <TouchableOpacity onPress={() => this.search()}>
            <Image
              source={images.global.search}
              style={[style.img, {tintColor: styles.color.ColorGreen}]}
              resizeMode="contain"
              tintColor={styles.color.ColorGreen}
            />
          </TouchableOpacity>
        </Item>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({id}, index) => id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => {
                  const {navigate} = this.props.navigation;
                  navigate('WeblogDetail', {weblog: item});
                }}>
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
                  <View style={style.view2}>
                    <View
                      style={{flex: 0.8, marginBottom: normalize(5, 'height')}}>
                      <Text style={style.title}>{item.Mini_Text}</Text>

                      <View style={style.fe}>
                        <Text style={style.greenTxt}>بیشتر بدانید</Text>
                        <TouchableOpacity
                          onPress={() => {
                            const {navigate} = this.props.navigation;
                            navigate('WeblogDetail', {weblog: item});
                          }}>
                          <Image
                            source={images.global.arrow_back}
                            style={[
                              style.img2,
                              {tintColor: styles.color.ColorGreen},
                            ]}
                            tintColor={styles.color.ColorGreen}
                            resizeMode="contain"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{marginVertical: 15}}>
                      <Avatar
                        rounded
                        source={{uri: `${item.Pic}`}}
                        size={90}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <View style={style.position}>
                    <LinearGradient
                      colors={[
                        styles.color.ColorOrange,
                        styles.color.ColorPink,
                      ]}
                      start={{x: 0, y: 0.5}}
                      end={{x: 1, y: 0.5}}
                      style={style.radius}>
                      <View style={style.view3}>
                        <Image
                          source={images.global.calender}
                          style={style.img2}
                          resizeMode="contain"
                        />
                        <Text style={style.date}>
                          <Text style={style.date}>
                            {persianNumber(item.Time)}
                          </Text>
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}
const style = StyleSheet.create({
  main: {backgroundColor: 'white', flex: 1},
  title2: {
    color: styles.color.colorText_GrAY,
    fontSize: normalize(30),
    alignSelf: 'center',
    marginRight: normalize(120),
  },
  titleView: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: wp(10),
    marginLeft: wp(45),
    marginVertical: hp(3),
  },

  img: {height: hp(6), width: wp(6)},
  txt: {
    color: styles.color.colorText_GrAY,
    paddingHorizontal: wp(2.5),
  },
  view1: {
    marginHorizontal: wp(2),
    borderWidth: 1,
    borderColor: styles.color.colorText_GrAY,
    borderRadius: 20,
    marginBottom: hp(5),
    paddingHorizontal: wp(2),
  },
  txt: {
    color: styles.color.colorText_GrAY,
    flex: 1,
    fontSize: normalize(13),
  },
  title: {
    fontSize: normalize(12),
    color: styles.color.colorText_GrAY,
    marginBottom: hp(4),
  },
  view2: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  greenTxt: {
    color: styles.color.ColorGreen,
    fontSize: normalize(14),
    marginLeft: 5,
  },
  fe: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  position: {position: 'absolute', bottom: -hp(2), right: 20},
  radius: {borderRadius: 40},
  view3: {
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    paddingVertical: hp(0.8),
  },
  date: {color: 'white', fontSize: normalize(14), marginRight: 5},
  thumb: {width: wp(30), height: hp(20)},
  img2: {width: wp(3.5), height: hp(3.5)},
  item: {
    backgroundColor: 'white',
    height: hp(6.5),
    paddingRight: wp(5),
    borderColor: styles.color.COLOR_DARK_SEPERATOR,
    borderWidth: 2,
    elevation: 1,
    marginBottom: hp(5),
  },
  input: {fontFamily: 'IRANSansMobile', fontSize: normalize(14)},
});
