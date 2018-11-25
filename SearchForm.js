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
      authors: "",
      titles: "",
      prices: ""
    }
  }
  componentDidMount() {
    this.getTime()
    this.getAmPm()
  }
  async handleAuthor(author) {
  	let url = "http://localhost:5000/penny/getAuthors"
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
    if (responseJson) { 
        this.setState({
          authors: responseJson.map(x => x.author + ': ')
      })
        this.setState({
          titles: responseJson.map(x => x.title + ' ')
      })
        this.setState({
          prices: responseJson.map(x => '($' + x.price + ')')
      })
    }
    else {
      this.setState({
          authors: ""
      })
        this.setState({
          titles: ""
      })
        this.setState({
          prices: ""
      })
    }
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
	    <View>
        <Text style={styles.welcome}>{this.state.authors[0]}{this.state.titles[0]}{this.state.prices[0]}</Text>
        <Text style={styles.welcome}>{this.state.authors[1]}{this.state.titles[1]}{this.state.prices[1]}</Text>
      </View>
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'lightsalmon',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: 'black',
    margin: 10,
    fontSize: 16
  },
});