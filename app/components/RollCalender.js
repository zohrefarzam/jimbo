/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import {Picker} from 'react-native-wheel-pick';
import {persianNumber} from '../lib/persian';
import YearData from '../CalenderData/YearData';
import MounthData from '../CalenderData/MounthData';
import DayData from '../CalenderData/DayData';
import styles from '../config/styles';
import {latinNumber} from '../lib/persian';
import moment from 'moment-jalaali';
export default class RollCalender extends Component {
  selectYear = async value => {
    this.props.onChangeYear(latinNumber(value));
    this.dateWithHour();
    this.Date();
  };
  selectMonth = async value => {
    let monthNumber;
    switch (value) {
      case 'فروردین':
        monthNumber = 1;
        break;
      case 'اردیبهشت':
        monthNumber = 2;
        break;
      case 'خرداد':
        monthNumber = 3;
        break;
      case 'تیر':
        monthNumber = 4;
        break;
      case 'مرداد':
        monthNumber = 5;
        break;
      case 'شهریور':
        monthNumber = 6;
        break;
      case 'مهر':
        monthNumber = 7;
        break;
      case 'آبان':
        monthNumber = 8;
        break;
      case 'آذر':
        monthNumber = 9;
        break;
      case 'دی':
        monthNumber = 10;
        break;
      case 'بهمن':
        monthNumber = 11;
        break;
      case 'اسفند':
        monthNumber = 12;
        break;
    }
    await this.props.onChangeMonth(monthNumber);
    this.dateWithHour();
    this.Date();
  };
  selectDay = async value => {
    this.props.onChangeDay(latinNumber(value));
    this.dateWithHour();
    this.Date();
  };
  dateWithHour = async () => {
    const {year, month, day} = await this.props;
    const time = await moment().format('hh:mm:ss');
    const jDate = await moment(
      `${year}/${month}/${day} ${time}`,
      'jYYYY/jM/jD hh:mm:ss',
    ).format('YYYY/MM/DD hh:mm:ss');
    if (this.props.dateWithHour) {
      this.props.dateWithHour(jDate);
    }
  };
  Date = async () => {
    const {year, month, day} = this.props;
    const jDate = await moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').format(
      'YYYY/MM/DD',
    );
    if (this.props.Date) {
      this.props.Date(jDate);
    }
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'center',
        }}>
        <Picker
          style={{
            backgroundColor: 'transparent',
            width: 90,
            height: 120,
          }}
          selectedValue={persianNumber(this.props.year || '1300')}
          pickerData={YearData}
          onValueChange={this.selectYear}
          itemSpace={30} // this only support in android
        />
        <Picker
          style={{
            backgroundColor: 'transparent',
            width: 95,
            height: 120,
            marginHorizontal: 30,
          }}
          selectedValue={MounthData[this.props.month - 1 || 0]}
          pickerData={MounthData}
          onValueChange={this.selectMonth}
          itemSpace={30} // this only support in android
        />
        <Picker
          style={{
            backgroundColor: 'transparent',
            width: 90,
            height: 120,
          }}
          selectedValue={persianNumber(this.props.day || '0')}
          pickerData={DayData}
          onValueChange={this.selectDay}
          itemSpace={30} // this only support in android
        />
      </View>
    );
  }
}
