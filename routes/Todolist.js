import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Done from '../screens/Done';
import Todo from '../screens/Todo';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Tab =  createMaterialBottomTabNavigator();

const Todolist = () => {
  return (
    <Tab.Navigator 
    initialRouteName ='Todo'
    activeColor="#f0edf6"
    inactiveColor="#3e2465"
    barStyle={{ backgroundColor: '#694fad' }}
    screenOptions={({route}) => ({
        tabBarIcon:({focused,color,size}) => {
            let iconName;
            if(route.name === 'Todo'){
                iconName = 'clipboard-list'
                color = focused ? 'green' : 'gray'
                size = focused ? 25 : 20
            }else if(route.name === 'Done'){
                iconName = 'calendar-check'
                color = focused ? 'green' : 'gray'
                size = focused ? 25 : 20
            }
            return (
                <FontAwesome5
                name={iconName}
                color = {color}
                size = {size}
                />
            )
        },
    })}
    >
        <Tab.Screen 
        name='Todo' 
        component={Todo}
        />
        <Tab.Screen 
        name = 'Done' 
        component={Done}
        />
    </Tab.Navigator>
  )
}

export default Todolist

  