/**
 * React Native Penny Application 
 * Author: Vinay Ramesh
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
   StyleSheet, Text, View, TouchableOpacity, TextInput
} from 'react-native';



export default class SearchForm extends Component {
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
      amPm: null,
      books: null
    }
  }
  componentDidMount() {
    this.getTime()
    this.getAmPm()
  }
  async handleAuthor(author) {
  	let url = "localhost:5000/penny/getAuthors"
  	let response = await fetch(url, 
  	{
  		method: "POST",
  		body: JSON.stringify({
  			query_string: author
  		}),
  		headers: {
  			'Content-Type': 'application/json'
  		}
  	})

  	let responseJson = await response.json()
  	console.log(responseJson)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Good {this.state.amPm} and welcome to Penny.com</Text>
        <Text style={styles.welcome}>Today is {this.state.curTime}.</Text>
        <Text style={styles.welcome}>Please enter an author name</Text>
        <TextInput 
	        style={styles.inputBox}
	        underlineColorAndroid='rgba(0,0,0,0)'
	        placeholder= "Author"
	        placeholderTextColor='white'
	        onChangeText={(author) => {
	        	this.handleAuthor(author)
	        }}
	    />
	    <Text style={styles.welcome}>{this.state.books}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: 'white',
    margin: 10,
    fontSize: 16
  },
});