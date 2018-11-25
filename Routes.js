import React, {Component} from 'react'
import {createStackNavigator} from 'react-navigation'

import Home from './Home'
import SearchForm from './SearchForm'


const Navigator = createStackNavigator({
	Home: {screen: Home},
	SearchForm: {screen: SearchForm}
},
{
	initialRouteName: 'Home',
	headerMode: 'None'
})

export default Navigator