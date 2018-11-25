import React, {Component} from 'react'
import {
	createStackNavigator,
	createAppContainer
} from 'react-navigation'


import Home from './Home'
import SearchForm from './SearchForm'


const MainNavigator = createStackNavigator({
	Home: {screen: Home},
	SearchForm: {screen: SearchForm}
},
{
	initialRouteName: 'Home',
	headerMode: 'None'
})

const Navigator = createAppContainer(MainNavigator);

export default Navigator