/**
 * React Native Penny Application 
 * Author: Vinay Ramesh
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text, View, TouchableOpacity
} from 'react-native';


/*
  If you desire to have the app do something different
  based on the device OS, you can
  do it in the following way.
*/

  const instructions = Platform.select({
    ios: 'iOS users, click here to begin',
    android:
      'Android users, click here to begin',
  });

export default class Home extends Component {
  getTime() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      })
    }, 1000)
  }
  getAmPm() {
    let hours = new Date().getHours()
    if (hours >= 12) hours = "afternoon"
    else hours = "morning"
    setInterval(() => {
      this.setState({
        amPm: hours
      })
    }, 1000)
  }
  constructor(props) {
    super(props)

    this.state = {
      curTime: null,
      amPm: null
    }
  }
  componentDidMount() {
    this.getTime()
    this.getAmPm()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Good {this.state.amPm} and welcome to Penny.com</Text>
        <Text style={styles.date}>Today is {this.state.curTime}.</Text>
        <TouchableOpacity 
            style={styles.button}
            onPress={()=>this.props.navigation.navigate("SearchForm")}
          >
            <Text style={styles.buttonText}>{instructions}</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  date: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    fontSize: 18
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 16
  },
  button: {
    backgroundColor: '#ee6002',
    borderRadius: 25,
    width: 300,
    margin: 10
  },
});