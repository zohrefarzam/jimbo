import {StyleSheet} from 'react-native';
import styles from '../config/styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import normalize from 'react-native-normalize';
const navigationStyle = StyleSheet.create({
  imageIcon: {height: hp(6.2), width: wp(6.2)},
  leftcontainer: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: -25,
  },
  rightContainerDef: {
    marginTop: -25,
  },
  DrawerBtn: {alignSelf: 'flex-start', padding: 5, marginTop: 5},
  buyingView: {marginTop: 40, paddingLeft: 10, paddingBottom: 10},
  buyingBtn: {
    backgroundColor: styles.color.ColorRed,
    borderRadius: 5,
    padding: 4,
  },
  buyingText: {
    fontSize: 8,
    color: '#576574',
    marginTop: 5,
    fontFamily: 'IRANSansMobile',
    textAlign: 'center',
  },
  rightContainer: {
    // height: 100,
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  notifBtn: {alignSelf: 'flex-end', paddingBottom: 35, paddingHorizontal: 5},
  billView: {marginBottom: 10, paddingRight: 15, paddingVertical: 10},
  billBtn: {
    backgroundColor: styles.color.ColorGreenFos,
    borderRadius: 5,
    padding: 5,
  },
  billText: {
    fontSize: 8,
    color: '#576574',
    marginTop: 5,
    fontFamily: 'IRANSansMobile',
    textAlign: 'center',
  },
  avatar: {marginRight: '10%', marginTop: 35},
  header: {
    color: styles.color.ColorDarkBlue,
    fontSize: 17,
    fontFamily: 'IRANSansMobile',
    paddingBottom: 100,
  },
  headerHome: {
    backgroundColor: styles.color.ColorGray,
    height: 130,
    elevation: 6,
  },
  headerScreen: {
    color: styles.color.ColorDarkBlue,
    fontSize: 17,
    paddingBottom: 20,
    fontFamily: 'IRANSansMobile',
  },
  headerContainer: {
    backgroundColor: styles.color.ColorGray,
    height: 70,
    elevation: 6,
  },
  lable: {
    fontSize: normalize(14),
    fontFamily: 'IRANSansMobile',
    paddingTop: normalize(10, 'height'),
  },
});

export default navigationStyle;
