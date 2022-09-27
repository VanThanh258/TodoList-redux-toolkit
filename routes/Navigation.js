import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Todolist from './Todolist';
import Addtodo from './Addtodo';
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Todolist' screenOptions={{headerShown: false}}>
            <Stack.Screen name = 'Todolist' component={Todolist}/>
            <Stack.Screen name = 'AddTodo' component={Addtodo}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;