import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, Text, View } from 'react-native';
import AddUserScreen from './screens/AddUserScreen'
import UserScreen from './screens/UserScreen'
import UserDetailScreen from './screens/UserDetailScreen'



const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ef6f0d'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Stack.Screen 
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ title: 'เพิ่มเมนูอาหาร'}}
      />
      <Stack.Screen 
        name="UserScreen"
        component={UserScreen}
        options={{ title: 'เมนูทั้งหมด'}}
      />
      <Stack.Screen 
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: 'แก้ไขข้อมูลเมนูอาหาร'}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});